import { prisma } from "@/prisma";
import { CandidateStatusEnum, Prisma } from "@prisma/client";
import {
  getNextAction,
  ApplicationWithInterviews,
} from "@/lib/utils/next-action";

export interface CandidateFilters {
  companyId: string; // always required - tenant scoping
  widgetId?: string;
  jobId?: string;
  status?: CandidateStatusEnum;
  search?: string; // matches candidate name/email
  sortBy?: "appliedDate" | "aiScore" | "statusUpdatedAt";
  sortDir?: "asc" | "desc";
  page?: number; // 1-indexed
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 25;
// Add near the top, after imports
export type CandidateRow = Awaited<
  ReturnType<typeof getCandidates>
>["rows"][number];
export async function getCandidates(filters: CandidateFilters) {
  const {
    companyId,
    widgetId,
    jobId,
    status,
    search,
    sortBy = "appliedDate",
    sortDir = "desc",
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters;

  const where: Prisma.ApplicationWhereInput = {
    companyId,
    ...(widgetId && { widgetId }),
    ...(jobId && { jobId }),
    ...(status && { candidateStatus: status }),
    ...(search && {
      candidate: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
  };

  // Map UI sort keys to actual Prisma orderBy shapes
  const orderBy: Prisma.ApplicationOrderByWithRelationInput =
    sortBy === "aiScore"
      ? { aiEvaluation: { aiScore: sortDir } }
      : sortBy === "statusUpdatedAt"
        ? { statusUpdatedAt: sortDir }
        : { createdAt: sortDir }; // appliedDate = createdAt

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        candidate: true,
        aiEvaluation: true,
        interviews: true,
        job: { select: { id: true, title: true } },
        widget: { select: { id: true, widgetName: true } },
      },
    }),
    prisma.application.count({ where }),
  ]);

  // Attach computed next action to each row
  const rows = applications.map((app) => ({
    ...app,
    nextAction: getNextAction(app as ApplicationWithInterviews),
  }));

  return {
    rows,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// Single candidate profile - full detail, no pagination
export async function getCandidateById(
  applicationId: string,
  companyId: string,
) {
  const application = await prisma.application.findFirst({
    where: { id: applicationId, companyId }, // companyId guard prevents cross-tenant access
    include: {
      candidate: true,
      aiEvaluation: true,
      interviews: { orderBy: { interviewTime: "desc" } },
      job: true,
      widget: true,
    },
  });

  if (!application) return null;

  return {
    ...application,
    nextAction: getNextAction(application as ApplicationWithInterviews),
  };
}
