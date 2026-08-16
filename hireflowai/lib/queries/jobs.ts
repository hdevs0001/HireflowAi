import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

export interface JobFilters {
  companyId: string;
  search?: string;
  filter?: "no-applicants" | "active" | "inactive";
  page?: number;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 25;

export async function getJobs(filters: JobFilters) {
  const {
    companyId,
    search,
    filter,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters;

  const where: Prisma.JobWhereInput = {
    companyId,
    ...(search && { title: { contains: search, mode: "insensitive" } }),
    ...(filter === "no-applicants" && { applications: { none: {} } }),
    ...(filter === "active" && { isActive: true }),
    ...(filter === "inactive" && { isActive: false }),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: { select: { applications: true } },
        widgets: {
          include: { widget: { select: { id: true, widgetName: true } } },
        }, // NEW
      },
    }),
    prisma.job.count({ where }),
  ]);

  return {
    rows: jobs,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export type JobRow = Awaited<ReturnType<typeof getJobs>>["rows"][number];

export async function getJobById(jobId: string, companyId: string) {
  return prisma.job.findFirst({
    where: { id: jobId, companyId },
    include: { _count: { select: { applications: true } } },
  });
}

export async function createJob(data: {
  companyId: string;
  title: string;
  description: string;
  evaluationPrompt?: string;
  widgetIds: string[]; // NEW - required, min 1 enforced in the route
}) {
  return prisma.job.create({
    data: {
      companyId: data.companyId,
      title: data.title,
      description: data.description,
      evaluationPrompt: data.evaluationPrompt,
      widgets: {
        create: data.widgetIds.map((widgetId) => ({ widgetId })),
      },
    },
    include: { widgets: { include: { widget: true } } },
  });
}

export async function updateJob(
  jobId: string,
  companyId: string,
  data: Partial<{
    title: string;
    description: string;
    evaluationPrompt: string;
    isActive: boolean;
    widgetIds: string[]; // NEW - if provided, replaces the widget links entirely
  }>,
) {
  const existing = await prisma.job.findFirst({
    where: { id: jobId, companyId },
  });
  if (!existing) return null;

  const { widgetIds, ...jobFields } = data;

  return prisma.job.update({
    where: { id: jobId },
    data: {
      ...jobFields,
      ...(widgetIds && {
        widgets: {
          deleteMany: {}, // clear existing links
          create: widgetIds.map((widgetId) => ({ widgetId })),
        },
      }),
    },
    include: { widgets: { include: { widget: true } } },
  });
}

export async function deleteJob(jobId: string, companyId: string) {
  const existing = await prisma.job.findFirst({
    where: { id: jobId, companyId },
  });
  if (!existing) return null;

  // Job has onDelete: Restrict on Application - can't delete a job with applications
  return prisma.job.delete({ where: { id: jobId } });
}
