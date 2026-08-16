import { prisma } from "@/prisma";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";

export async function getAnalyticsCards(companyId: string) {
  const [total, accepted, interviewing, rejected] = await Promise.all([
    prisma.application.count({ where: { companyId } }),
    prisma.application.count({
      where: { companyId, candidateStatus: "PLACED" },
    }),
    prisma.application.count({
      where: { companyId, candidateStatus: "INTERVIEWING" },
    }),
    prisma.application.count({
      where: { companyId, candidateStatus: { in: ["REJECTED", "WITHDRAW"] } },
    }),
  ]);

  return { total, accepted, interviewing, rejected };
}

export async function getAnalyticsSummary(companyId: string) {
  const { total, accepted, interviewing, rejected } =
    await getAnalyticsCards(companyId);

  const avgScoreResult = await prisma.aIEvaluation.aggregate({
    where: { application: { companyId } },
    _avg: { aiScore: true },
  });

  const pct = (n: number) =>
    total > 0 ? Math.round((n / total) * 1000) / 10 : 0;

  return {
    acceptanceRate: pct(accepted),
    interviewRate: pct(interviewing),
    rejectionRate: pct(rejected),
    averageAiScore: avgScoreResult._avg.aiScore
      ? Math.round(avgScoreResult._avg.aiScore)
      : null,
  };
}

export async function getHiringTrend(companyId: string) {
  const months = Array.from({ length: 6 }, (_, i) =>
    subMonths(new Date(), 5 - i),
  );

  const results = await Promise.all(
    months.map(async (monthDate) => {
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);

      const [accepted, interviewing, rejected] = await Promise.all([
        prisma.statusHistory.count({
          where: {
            companyId,
            toStatus: "PLACED",
            changedAt: { gte: start, lte: end },
          },
        }),
        prisma.statusHistory.count({
          where: {
            companyId,
            toStatus: "INTERVIEWING",
            changedAt: { gte: start, lte: end },
          },
        }),
        prisma.statusHistory.count({
          where: {
            companyId,
            toStatus: { in: ["REJECTED", "WITHDRAW"] },
            changedAt: { gte: start, lte: end },
          },
        }),
      ]);

      return {
        month: format(monthDate, "MMM"),
        accepted,
        interviewing,
        rejected,
      };
    }),
  );

  return results;
}
