import {
  CheckCircle2,
  XCircle,
  Clock3,
  Users,
} from "lucide-react";

import StatsCard from "./stats-card";

export default function AnalyticsCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Candidates"
        value={1245}
        icon={Users}
        color="bg-slate-900"
      />

      <StatsCard
        title="Accepted"
        value={342}
        icon={CheckCircle2}
        color="bg-green-600"
      />

      <StatsCard
        title="Interviewing"
        value={186}
        icon={Clock3}
        color="bg-blue-600"
      />

      <StatsCard
        title="Rejected"
        value={717}
        icon={XCircle}
        color="bg-red-600"
      />
    </div>
  );
}