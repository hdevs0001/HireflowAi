import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

export interface WidgetFilters {
  companyId: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 25;

export async function getWidgets(filters: WidgetFilters) {
  const { companyId, search, page = 1, pageSize = DEFAULT_PAGE_SIZE } = filters;

  const where: Prisma.WidgetWhereInput = {
    companyId,
    ...(search && { widgetName: { contains: search, mode: "insensitive" } }),
  };

  const [widgets, total] = await Promise.all([
    prisma.widget.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: { select: { applications: true, jobs: true } },
      },
    }),
    prisma.widget.count({ where }),
  ]);

  return {
    rows: widgets,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export type WidgetRow = Awaited<ReturnType<typeof getWidgets>>["rows"][number];

export async function getWidgetDetail(widgetId: string, companyId: string) {
  const widget = await prisma.widget.findFirst({
    where: { id: widgetId, companyId },
    include: {
      jobs: { include: { job: { include: { _count: { select: { applications: true } } } } } },
      _count: { select: { applications: true } },
    },
  });

  if (!widget) return null;

  // Applications broken down by status, scoped to this widget - powers the mini funnel on the detail page
  const statusBreakdown = await prisma.application.groupBy({
    by: ["candidateStatus"],
    where: { widgetId, companyId },
    _count: true,
  });

  return { ...widget, statusBreakdown };
}

export async function createWidget(data: {
  companyId: string;
  widgetName: string;
  allowedDomains: string[];
}) {
  return prisma.widget.create({ data });
}

export async function updateWidget(
  widgetId: string,
  companyId: string,
  data: Partial<{ widgetName: string; allowedDomains: string[]; isActive: boolean }>
) {
  const existing = await prisma.widget.findFirst({ where: { id: widgetId, companyId } });
  if (!existing) return null;

  return prisma.widget.update({ where: { id: widgetId }, data });
}

export async function deleteWidget(widgetId: string, companyId: string) {
  const existing = await prisma.widget.findFirst({ where: { id: widgetId, companyId } });
  if (!existing) return null;

  return prisma.widget.delete({ where: { id: widgetId } });
}