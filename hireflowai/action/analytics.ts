"use server";

export interface AnalyticsData {
  totalCandidates: number;
  accepted: number;
  rejected: number;
  interviewing: number;
  averageResumeScore: number;
}

export async function getAnalytics(): Promise<AnalyticsData> {
  return {
    totalCandidates: 250,
    accepted: 70,
    rejected: 110,
    interviewing: 70,
    averageResumeScore: 82,
  };
}