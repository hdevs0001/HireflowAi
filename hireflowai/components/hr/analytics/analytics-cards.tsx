import { CheckCircle2, XCircle, Clock3, Users } from "lucide-react";
import StatsCard from "./stats-card";

interface Props {
  data: {
    total: number;
    accepted: number;
    interviewing: number;
    rejected: number;
  };
}

export default function AnalyticsCards({ data }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Total Candidates" value={data.total} icon={Users} color="bg-slate-900" />
      <StatsCard title="Accepted" value={data.accepted} icon={CheckCircle2} color="bg-green-600" />
      <StatsCard title="Interviewing" value={data.interviewing} icon={Clock3} color="bg-blue-600" />
      <StatsCard title="Rejected" value={data.rejected} icon={XCircle} color="bg-red-600" />
    </div>
  );
}