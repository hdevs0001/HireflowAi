"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

async function requireCompanyUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.companyId) throw new Error("User is not associated with a company");
  return user;
}

export async function getAllWidgets() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  return prisma.widget.findMany({
    where: { companyId: user.companyId },
    orderBy: { createdAt: "desc" },
  });
}
export async function createWidget(name: string, allowedDomains: string[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  if (!name.trim()) {
    throw new Error("Widget name is required");
  }

  if (allowedDomains.length === 0) {
    throw new Error("At least one allowed domain is required");
  }

  return prisma.widget.create({
    data: {
      widgetName: name.trim(),
      companyId: user.companyId,
      allowedDomains,
      isActive: true,
    },
  });
}

export async function addAllowedDomain(widgetId: string, domain: string) {
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

  const normalizedDomain = domain.trim().toLowerCase().replace(/\/+$/, "");

  if (!normalizedDomain) {
    throw new Error("Invalid domain");
  }

  if (widget.allowedDomains.includes(normalizedDomain)) {
    throw new Error("Domain already exists");
  }

  const allowedDomains = [...widget.allowedDomains, normalizedDomain];

  return prisma.widget.update({
    where: {
      id: widget.id,
    },
    data: {
      allowedDomains,
    },
  });
}

export async function removeAllowedDomain(widgetId: string, domain: string) {
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

  if (widget.allowedDomains.length <= 1) {
    throw new Error("A widget must have at least one allowed domain.");
  }

  const allowedDomains = widget.allowedDomains.filter(
    (item) => item !== domain,
  );

  return prisma.widget.update({
    where: {
      id: widget.id,
    },
    data: {
      allowedDomains,
    },
  });
}

// action/widget.ts — add this
export async function updateWidgetName(widgetId: string, name: string) {
  const admin = await requireCompanyUser(); // however your other widget actions authorize
  const widget = await prisma.widget.findUnique({
    where: { id: widgetId },
    select: { companyId: true },
  });
  if (!widget || widget.companyId !== admin.companyId) {
    throw new Error("Widget not found");
  }
  return prisma.widget.update({
    where: { id: widgetId },
    data: { widgetName: name.trim() || null },
  });
}
