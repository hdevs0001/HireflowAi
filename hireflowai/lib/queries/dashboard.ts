import { prisma } from "@/prisma";
import { startOfDay, endOfDay, startOfMonth, subDays } from "date-fns";

const RECOMMENDED_STALE_DAYS = 2;
const OFFER_STALE_DAYS = 5;

export async function getDashboardStats(companyId: string) {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const monthStart = startOfMonth(now);

  const [totalActive, interviewsToday, hiredThisMonth, openPositions] =
    await Promise.all([
      // Active = not in a terminal status
      prisma.application.count({
        where: {
          companyId,
          candidateStatus: { notIn: ["PLACED", "REJECTED", "WITHDRAW"] },
        },
      }),

      prisma.interview.count({
        where: {
          companyId,
          interviewTime: { gte: todayStart, lte: todayEnd },
        },
      }),

      prisma.application.count({
        where: {
          companyId,
          candidateStatus: "PLACED",
          statusUpdatedAt: { gte: monthStart },
        },
      }),

      prisma.job.count({
        where: { companyId, isActive: true },
      }),
    ]);

  return { totalActive, interviewsToday, hiredThisMonth, openPositions };
}

export async function getNeedsAttention(companyId: string) {
  const now = new Date();

  const [
    waitingForReview,
    interviewsNeedingFeedback,
    offersNeedingAction,
    jobsWithNoApplicants,
  ] = await Promise.all([
    // Recommended, stale
    prisma.application.count({
      where: {
        companyId,
        candidateStatus: "RECOMMENDED",
        statusUpdatedAt: { lte: subDays(now, RECOMMENDED_STALE_DAYS) },
      },
    }),

    // Completed interviews with no outcome recorded yet
    prisma.interview.count({
      where: {
        companyId,
        interViewStatus: "COMPLETED",
        outcome: null,
      },
    }),

    // Offered, stale
    prisma.application.count({
      where: {
        companyId,
        candidateStatus: "OFFERED",
        statusUpdatedAt: { lte: subDays(now, OFFER_STALE_DAYS) },
      },
    }),

    // Active jobs with zero applications
    prisma.job.count({
      where: {
        companyId,
        isActive: true,
        applications: { none: {} },
      },
    }),
  ]);

  return {
    waitingForReview,
    interviewsNeedingFeedback,
    offersNeedingAction,
    jobsWithNoApplicants,
    total:
      waitingForReview +
      interviewsNeedingFeedback +
      offersNeedingAction +
      jobsWithNoApplicants,
  };
}

// Widget-level summary table for the dashboard (rows below the KPI cards)
export async function getWidgetSummary(companyId: string) {
  const widgets = await prisma.widget.findMany({
    where: { companyId, isActive: true },
    select: {
      id: true,
      widgetName: true,
      _count: { select: { applications: true } },
    },
  });

  // Needs Attention per widget - separate query since it's not a simple _count
  const withAttention = await Promise.all(
    widgets.map(async (w) => {
      const needsAttention = await prisma.application.count({
        where: {
          widgetId: w.id,
          candidateStatus: { in: ["RECOMMENDED", "OFFERED"] },
          statusUpdatedAt: { lte: subDays(new Date(), RECOMMENDED_STALE_DAYS) },
        },
      });
      return {
        id: w.id,
        widgetName: w.widgetName ?? "Untitled Widget",
        applicationCount: w._count.applications,
        needsAttention,
      };
    }),
  );

  return withAttention;
}

export async function getRecentActivity(companyId: string, limit = 10) {
  return prisma.application.findMany({
    where: { companyId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      candidate: { select: { name: true } },
      job: { select: { title: true } },
    },
  });
}

export async function getInterviewsToday(companyId: string) {
  const now = new Date();
  return prisma.interview.findMany({
    where: {
      companyId,
      interviewTime: { gte: startOfDay(now), lte: endOfDay(now) },
    },
    orderBy: { interviewTime: "asc" },
    include: {
      candidate: { select: { name: true } },
      application: { include: { job: { select: { title: true } } } },
    },
  });
}

// Funnel counts per status, in pipeline order (excludes exit states - REJECTED/WITHDRAW don't belong in a "progress" funnel)
export async function getPipelineFunnel(companyId: string) {
  const statuses = [
    "UNEVALUATED",
    "RECOMMENDED",
    "INTERVIEWING",
    "OFFERED",
    "ON_TRIAL",
    "PLACED",
  ] as const;

  const counts = await Promise.all(
    statuses.map((status) =>
      prisma.application.count({
        where: { companyId, candidateStatus: status },
      }),
    ),
  );

  const total = counts.reduce((sum, c) => sum + c, 0) || 1; // avoid divide-by-zero

  return statuses.map((status, i) => ({
    stage: status,
    count: counts[i],
    percent: Math.round((counts[i] / total) * 100),
  }));
}
export async function getAIInsights(companyId: string) {
  const todayStart = startOfDay(new Date());

  const [highScoreCount, needsSchedulingCount, resumesProcessedToday, avgScoreResult] =
    await Promise.all([
      prisma.aIEvaluation.count({
        where: { aiScore: { gt: 90 }, application: { companyId } },
      }),

      // INTERVIEWING status with zero interview records yet
      prisma.application.count({
        where: {
          companyId,
          candidateStatus: "INTERVIEWING",
          interviews: { none: {} },
        },
      }),

      prisma.aIEvaluation.count({
        where: {
          application: { companyId },
          createdAt: { gte: todayStart },
        },
      }),

      prisma.aIEvaluation.aggregate({
        where: { application: { companyId } },
        _avg: { aiScore: true },
      }),
    ]);

  return {
    highScoreCount,
    needsSchedulingCount,
    resumesProcessedToday,
    averageScore: avgScoreResult._avg.aiScore ? Math.round(avgScoreResult._avg.aiScore) : null,
  };
}