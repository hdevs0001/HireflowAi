import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ClipboardList, MessageSquareWarning, Briefcase } from "lucide-react";

interface Props {
  attention: {
    waitingForReview: number;
    interviewsNeedingFeedback: number;
    offersNeedingAction: number;
    jobsWithNoApplicants: number;
    total: number;
  };
}

export default function NeedsAttentionPanel({ attention }: Props) {
  const items = [
    {
      label: "Candidates waiting for review",
      count: attention.waitingForReview,
      href: "/hr/candidate?status=RECOMMENDED",
      icon: ClipboardList,
    },
    {
      label: "Interviews waiting for feedback",
      count: attention.interviewsNeedingFeedback,
      href: "/hr/interview?view=needs-feedback",
      icon: MessageSquareWarning,
    },
    {
      label: "Offers requiring action",
      count: attention.offersNeedingAction,
      href: "/hr/candidate?status=OFFERED",
      icon: AlertCircle,
    },
    {
      label: "Jobs with no applicants",
      count: attention.jobsWithNoApplicants,
      href: "/hr/job?filter=no-applicants",
      icon: Briefcase,
    },
  ];

  const activeItems = items.filter((item) => item.count > 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Needs Attention</CardTitle>
        {attention.total > 0 && (
          <Badge className="bg-red-500 hover:bg-red-500">{attention.total}</Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-1">
        {activeItems.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            All caught up — nothing needs attention right now.
          </p>
        ) : (
          activeItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 -mx-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}