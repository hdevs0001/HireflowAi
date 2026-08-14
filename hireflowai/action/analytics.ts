"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

export interface AnalyticsData {
  totalCandidates: number;
  recommended: number;
  rejected: number;
  interviewing: number;
  averageResumeScore: number;
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  const companyId = user.companyId;

  const [
    totalCandidates,
    recommended,
    rejected,
    interviewing,
    averageScore,
  ] = await Promise.all([
    prisma.candidate.count({
      where: { companyId },
    }),

    prisma.application.count({
      where: { companyId, candidateStatus: "RECOMMENDED" },
    }),

    prisma.application.count({
      where: { companyId, candidateStatus: "REJECTED" },
    }),

    prisma.application.count({
      where: { companyId, candidateStatus: "INTERVIEWING" },
    }),

    prisma.aIEvaluation.aggregate({
      where: {
        application: { companyId },
      },
      _avg: { aiScore: true },
    }),
  ]);

  return {
    totalCandidates,
    recommended,
    rejected,
    interviewing,
    averageResumeScore:
      averageScore._avg.aiScore === null
        ? 0
        : Math.round(averageScore._avg.aiScore),
  };
}