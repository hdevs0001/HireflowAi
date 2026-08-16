import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATUS_LABELS } from "@/lib/utils/status-machine";
import { CandidateStatusEnum } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  candidateStatus: CandidateStatusEnum;
  updatedAt: Date;
  candidate: { name: string | null };
  job: { title: string };
}

interface Props {
  activity: ActivityItem[];
}

export default function RecentActivity({ activity }: Props) {
  if (activity.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {activity.map((item) => (
          <div key={item.id} className="border-l-2 pl-4 text-sm">
            <span className="font-medium">{item.candidate.name ?? "Unknown"}</span> is now{" "}
            <span className="text-muted-foreground">{STATUS_LABELS[item.candidateStatus]}</span> for{" "}
            <span className="font-medium">{item.job.title}</span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              {formatDistanceToNow(item.updatedAt, { addSuffix: true })}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}