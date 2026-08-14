"use server";

import { DashboardStats } from "@/components/dashboard/dashboardstats";
import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

export async function getDashboardStats(): Promise<DashboardStats> {
  const user = await getCurrentUser();

  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  const companyId = user.companyId;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [
    totalCandidates,
    interviewsToday,
    activeHR,
    resumesUploadedToday,
    averageAIScore,
  ] = await Promise.all([
    prisma.candidate.count({
      where: { companyId },
    }),

    prisma.interview.count({
      where: {
        companyId,
        interviewTime: { gte: startOfToday, lte: endOfToday },
      },
    }),

    prisma.user.count({
      where: { companyId, role: "HR", hrStatus: "ENABLE" },
    }),

    prisma.candidate.count({
      where: { companyId, createdAt: { gte: startOfToday, lte: endOfToday } },
    }),

    prisma.aIEvaluation.aggregate({
      where: {
        application: {   // ← fixed: filter through Application, not Candidate
          companyId,
        },
      },
      _avg: { aiScore: true },
    }),
  ]);

  return {
    totalCandidates,
    interviewsToday,
    activeHR,
    resumesUploadedToday,
    averageAIScore:
      averageAIScore._avg.aiScore === null
        ? null
        : Math.round(averageAIScore._avg.aiScore),
  };
}