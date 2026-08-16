import StatsCard from "./stats-card";
import { Users, CalendarDays, UserCheck, BriefcaseBusiness } from "lucide-react";

interface Props {
  stats: {
    totalActive: number;
    interviewsToday: number;
    hiredThisMonth: number;
    openPositions: number;
  };
}

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Total Candidates" value={stats.totalActive.toLocaleString()} icon={Users} />
      <StatsCard title="Interviews Today" value={stats.interviewsToday.toString()} icon={CalendarDays} />
      <StatsCard
        title="Hired"
        value={stats.hiredThisMonth.toString()}
        icon={UserCheck}
        change={`+${stats.hiredThisMonth} this month`}
      />
      <StatsCard title="Open Positions" value={stats.openPositions.toString()} icon={BriefcaseBusiness} />
    </div>
  );
}