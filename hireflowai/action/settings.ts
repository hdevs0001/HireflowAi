"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Error("You do not have permission to change settings");
  }
  if (!user.companyId) throw new Error("Not associated with a company");
  return user;
}

// ── Company Profile ──────────────────────────────────────────────
const profileSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is too short"),
  address: z.string().trim().min(2, "Address is required"),
});

export async function updateCompanyProfile(input: { companyName: string; address: string }) {
  const admin = await requireAdmin();
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.company.update({
    where: { id: admin.companyId! },
    data: parsed.data,
  });

  revalidatePath("/admin/settings");
  return { success: true, message: "Company profile updated" };
}

// ── Application Settings (cooldown + thresholds) ────────────────
const applicationSettingsSchema = z
  .object({
    applicationCooldownDays: z.number().int().min(0).max(365),
    rejectionThreshold: z.number().int().min(0).max(100),
    recommendedThreshold: z.number().int().min(0).max(100),
  })
  .refine((data) => data.recommendedThreshold > data.rejectionThreshold, {
    message: "Recommended threshold must be higher than rejection threshold",
    path: ["recommendedThreshold"],
  });

export async function updateApplicationSettings(input: {
  applicationCooldownDays: number;
  rejectionThreshold: number;
  recommendedThreshold: number;
}) {
  const admin = await requireAdmin();
  const parsed = applicationSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.company.update({
    where: { id: admin.companyId! },
    data: parsed.data,
  });

  revalidatePath("/admin/settings");
  return { success: true, message: "Application settings updated" };
}

// ── AI Default Prompt (company-level fallback) ──────────────────
export async function updateDefaultPrompt(prompt: string) {
  const admin = await requireAdmin();

  if (prompt.trim().length < 10) {
    return { success: false, message: "Prompt is too short" };
  }

  await prisma.company.update({
    where: { id: admin.companyId! },
    data: { aiDefaultPrompt: prompt.trim() },
  });

  revalidatePath("/admin/settings");
  return { success: true, message: "Default AI prompt updated" };
}

export async function getCompanySettings() {
  const admin = await getCurrentUser();
  if (!admin?.companyId) throw new Error("Not associated with a company");

  return prisma.company.findUniqueOrThrow({
    where: { id: admin.companyId },
    select: {
      companyName: true,
      address: true,
      email: true,
      applicationCooldownDays: true,
      rejectionThreshold: true,
      recommendedThreshold: true,
      aiDefaultPrompt: true,
    },
  });
}