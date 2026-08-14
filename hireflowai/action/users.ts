"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const createHrSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface CreateHrResult {
  success: boolean;
  message: string;
}

export interface HRUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  active: boolean;
}

export async function getAllHRUsers(): Promise<HRUser[]> {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("Unauthorized");
  }

  if (!admin.companyId) {
    throw new Error("User is not associated with a company");
  }

  const users = await prisma.user.findMany({
    where: {
      companyId: admin.companyId,
      role: "HR",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      hrStatus: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.hrStatus === "ENABLE",
  }));
}

export async function toggleHrStatus(
  userId: string,
  active: boolean,
): Promise<{ success: boolean; message: string }> {
  const admin = await getCurrentUser();

  if (!admin) {
    return { success: false, message: "Unauthorized" };
  }

  if (admin.role !== "ADMIN" && admin.role !== "SUPERUSER") {
    return { success: false, message: "You do not have permission to do this" };
  }

  if (!admin.companyId) {
    return {
      success: false,
      message: "Your account is not associated with a company",
    };
  }

  // Confirm the target user actually belongs to the admin's own company,
  // and is genuinely an HR account — prevents an admin from toggling
  // someone else's company's user by guessing an id.
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { companyId: true, role: true },
  });

  if (!target || target.companyId !== admin.companyId || target.role !== "HR") {
    return { success: false, message: "User not found" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { hrStatus: active ? "ENABLE" : "DISABLE" },
  });

  return {
    success: true,
    message: active ? "HR account enabled" : "HR account disabled",
  };
}
// this is creating the user
export async function createHrUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<CreateHrResult> {
  // 1. Authentication check — reuses the same logic as every other action
  const admin = await getCurrentUser();

  if (!admin) {
    return { success: false, message: "Unauthorized" };
  }

  // 2. Only ADMIN (or SUPERUSER) should be able to create HR accounts —
  //    an HR account creating another HR account shouldn't be allowed.
  if (admin.role !== "ADMIN" && admin.role !== "SUPERUSER") {
    return {
      success: false,
      message: "You do not have permission to create HR accounts",
    };
  }

  // 3. Company check — same guard as the other actions
  if (!admin.companyId) {
    return {
      success: false,
      message: "Your account is not associated with a company",
    };
  }

  // 4. Validate input shape before touching the DB
  const parsed = createHrSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { name, email, password } = parsed.data;

  // 5. Check if a user with this email ALREADY exists as HR at this company
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true, companyId: true },
  });

  if (existingUser) {
    if (
      existingUser.role === "HR" &&
      existingUser.companyId === admin.companyId
    ) {
      return {
        success: false,
        message: "This user already exists as an HR at your company",
      };
    }
    // Exists but under a different role/company — still block, since email is
    // globally unique on User (per your schema) — can't create a duplicate anyway.
    return { success: false, message: "A user with this email already exists" };
  }

  // 6. Hash the password — never store plain text, and this MUST match
  //    however your Credentials provider compares it (bcrypt.compare in auth.ts)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 7. Create the HR user, scoped to the admin's own company
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "HR",
      companyId: admin.companyId,
      hrStatus: "ENABLE",
    },
  });
  revalidatePath("/admin/users");
  return { success: true, message: "HR account created successfully" };
}
