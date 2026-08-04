
"use server";

import { auth } from "@/auth";
import {prisma} from "@/prisma"

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      companyId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

