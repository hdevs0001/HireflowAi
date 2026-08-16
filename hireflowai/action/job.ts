"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { revalidatePath } from "next/cache";
import { z } from "zod";

 export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Error("You do not have permission to manage jobs");
  }
  if (!user.companyId) throw new Error("Not associated with a company");
  return user;
}

export interface JobListItem {
  id: string;
  title: string;
  description: string;
  evaluationPrompt: string | null;
  isActive: boolean;
  applicationCount: number;
}

export async function getAllJobs(): Promise<JobListItem[]> {
  const user = await getCurrentUser();
  if (!user?.companyId) throw new Error("Not associated with a company");

  const jobs = await prisma.job.findMany({
    where: { companyId: user.companyId },
    select: {
      id: true,
      title: true,
      description: true,
      evaluationPrompt: true,
      isActive: true,
      _count: { select: { applications: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    evaluationPrompt: job.evaluationPrompt,
    isActive: job.isActive,
    applicationCount: job._count.applications,
  }));
}

const jobSchema = z.object({
  title: z.string().trim().min(2, "Title is too short").max(100, "Title is too long"),
  description: z.string().trim().min(10, "Description is too short"),
  evaluationPrompt: z.string().trim().optional(),
});

export async function createJob(input: {
  title: string;
  description: string;
  evaluationPrompt?: string;
}) {
  const admin = await requireAdmin();
  const parsed = jobSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.job.create({
    data: {
      companyId: admin.companyId!,
      title: parsed.data.title,
      description: parsed.data.description,
      evaluationPrompt: parsed.data.evaluationPrompt || null,
      isActive: true,
    },
  });

  revalidatePath("/admin/jobs");
  return { success: true, message: "Job created successfully" };
}

export async function updateJob(
  jobId: string,
  input: { title: string; description: string; evaluationPrompt?: string }
) {
  const admin = await requireAdmin();
  const parsed = jobSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Confirm the job actually belongs to this admin's company before editing —
  // same ownership guard pattern used everywhere else.
  const job = await prisma.job.findUnique({ where: { id: jobId }, select: { companyId: true } });
  if (!job || job.companyId !== admin.companyId) {
    return { success: false, message: "Job not found" };
  }

  await prisma.job.update({
    where: { id: jobId },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      evaluationPrompt: parsed.data.evaluationPrompt || null,
    },
  });

  revalidatePath("/admin/jobs");
  return { success: true, message: "Job updated successfully" };
}

export async function toggleJobActive(jobId: string, active: boolean) {
  const admin = await requireAdmin();

  const job = await prisma.job.findUnique({ where: { id: jobId }, select: { companyId: true } });
  if (!job || job.companyId !== admin.companyId) {
    return { success: false, message: "Job not found" };
  }

  await prisma.job.update({
    where: { id: jobId },
    data: { isActive: active },
  });

  revalidatePath("/admin/jobs");
  return { success: true, message: active ? "Job activated" : "Job deactivated" };
}