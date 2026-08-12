"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

export async function toggleWidget(widgetId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.companyId) {
    throw new Error("No company");
  }

  const widget = await prisma.widget.findFirst({
    where: {
      id: widgetId,
      companyId: user.companyId,
    },
  });

  if (!widget) {
    throw new Error("Widget not found");
  }

  return prisma.widget.update({
    where: {
      id: widget.id,
    },
    data: {
      isActive: !widget.isActive,
    },
  });
}