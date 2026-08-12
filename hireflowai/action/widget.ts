"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

export async function getWidget() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  const widget = await prisma.widget.findFirst({
    where: {
      companyId: user.companyId,
    },
   
  });

  return widget;
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

  const existingWidget = await prisma.widget.findFirst({
    where: {
      companyId: user.companyId,
    },
  });

  if (existingWidget) {
    throw new Error("Your company already has a widget.");
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

const normalizedDomain = domain
  .trim()
  .toLowerCase()
  .replace(/\/+$/, "");

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
