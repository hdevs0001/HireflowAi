import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Star,
  Users,
  UserRoundCheck,
} from "lucide-react";

import { StatCard } from "./statuscard";

export interface DashboardStats {
  totalCandidates: number;
  interviewsToday: number;
  activeHR: number;
  resumesUploadedToday: number;
  averageAIScore: number | null;
}

interface DashboardStatsProps {
  stats?: DashboardStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const data = stats ?? {
    totalCandidates: 0,
    openJobs: 0,
    interviewsToday: 0,
    activeHR: 0,
    resumesUploadedToday: 0,
    averageAIScore: 0,
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
      <StatCard
        title="Total Candidates"
        value={data.totalCandidates}
        icon={Users}
      />

      <StatCard
        title="Interviews Today"
        value={data.interviewsToday}
        icon={CalendarDays}
      />

      <StatCard title="Active HR" value={data.activeHR} icon={UserRoundCheck} />

      <StatCard
        title="Resume Uploads Today"
        value={data.resumesUploadedToday}
        icon={FileText}
      />

      <StatCard
        title="Average AI Score"
        value={data.averageAIScore === null ? "—" : `${data.averageAIScore}%`}
        icon={Star}
      />
    </section>
  );
}
