import StatsCard from "./stats-card";

import {
  Users,
  CalendarDays,
  UserCheck,
  BriefcaseBusiness,
} from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Candidates"
        value="1,245"
        icon={Users}
        change="+12%"
      />

      <StatsCard
        title="Interview Today"
        value="18"
        icon={CalendarDays}
      />

      <StatsCard
        title="Hired"
        value="52"
        icon={UserCheck}
        change="+5 this month"
      />

      <StatsCard
        title="Open Positions"
        value="14"
        icon={BriefcaseBusiness}
      />
    </div>
  );
}