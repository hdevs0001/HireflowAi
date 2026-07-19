"use server";

import { DashboardStats } from "@/components/dashboard/dashboardstats";

export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO:
  // Replace with Prisma queries later.

  return {
    totalCandidates: 1248,
    openJobs: 18,
    interviewsToday: 14,
    activeHR: 9,
    resumesUploadedToday: 73,
    averageAIScore: 87,
  };
}