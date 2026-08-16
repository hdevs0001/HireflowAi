import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";
import { startOfDay, endOfDay, addDays } from "date-fns";

export type InterviewView = "today" | "upcoming" | "needs-feedback" | "all";

export interface InterviewFilters {
  companyId: string;
  view?: InterviewView;
  search?: string;
  page?: number;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 25;

export async function getInterviews(filters: InterviewFilters) {
  const {
    companyId,
    view = "all",
    search,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters;

  const now = new Date();

  const where: Prisma.InterviewWhereInput = {
    companyId,
    ...(search && {
      candidate: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
  };

  if (view === "today") {
    where.interviewTime = { gte: startOfDay(now), lte: endOfDay(now) };
  } else if (view === "upcoming") {
    where.interviewTime = { gt: endOfDay(now), lte: addDays(now, 30) };
    where.interViewStatus = { in: ["SCHEDULED", "IN_PROGRESS"] };
  } else if (view === "needs-feedback") {
    where.outcome = null;
    where.interviewTime = { lte: new Date() }; // only ones whose scheduled time has passed
  }

  const orderBy: Prisma.InterviewOrderByWithRelationInput =
    view === "needs-feedback"
      ? { interviewTime: "desc" }
      : { interviewTime: "asc" };

  const [interviews, total] = await Promise.all([
    prisma.interview.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        candidate: { select: { name: true, email: true } },
        application: {
          select: {
            id: true,
            resumeUrl: true,
            resumePublicUrl: true,
            job: { select: { title: true } },
          },
        },
      },
    }),
    prisma.interview.count({ where }),
  ]);

  return {
    rows: interviews,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export type InterviewRow = Awaited<
  ReturnType<typeof getInterviews>
>["rows"][number];

export async function submitInterviewFeedback(
  interviewId: string,
  companyId: string,
  data: { feedback: string; feedbackScore: number; outcome: "PASS" | "FAIL" },
) {
  const existing = await prisma.interview.findFirst({
    where: { id: interviewId, companyId },
  });
  if (!existing) return null;

  return prisma.interview.update({
    where: { id: interviewId },
    data: {
      feedback: data.feedback,
      feedbackScore: data.feedbackScore,
      outcome: data.outcome,
      interViewStatus: "COMPLETED",
    },
  });
}

// Counts for tab labels - avoids fetching full rows just to show a number
export async function getInterviewViewCounts(companyId: string) {
  const now = new Date();

  const [today, upcoming, needsFeedback] = await Promise.all([
    prisma.interview.count({
      where: {
        companyId,
        interviewTime: { gte: startOfDay(now), lte: endOfDay(now) },
      },
    }),
    prisma.interview.count({
      where: {
        companyId,
        interviewTime: { gt: endOfDay(now), lte: addDays(now, 30) },
        interViewStatus: { in: ["SCHEDULED", "IN_PROGRESS"] },
      },
    }),
    prisma.interview.count({
      where: { companyId, outcome: null, interviewTime: { lte: new Date() } },
    }),
  ]);

  return { today, upcoming, needsFeedback };
}

export async function scheduleInterview(data: {
  companyId: string;
  candidateId: string;
  applicationId: string;
  round: "PHONE_SCREEN" | "TECHNICAL" | "HR_ROUND" | "FINAL" | "OTHER";
  interviewTime: Date;
  interviewerName?: string;
}) {
  // Dummy link generator - swap for a real video-call/scheduling integration later
  const interviewLink = `https://meet.hireflow.ai/${data.applicationId}-${Date.now()}`;

  return prisma.interview.create({
    data: {
      companyId: data.companyId,
      candidateId: data.candidateId,
      applicationId: data.applicationId,
      round: data.round,
      interviewTime: data.interviewTime,
      interviewerName: data.interviewerName,
      interviewLink,
      interViewStatus: "SCHEDULED",
    },
  });
}
