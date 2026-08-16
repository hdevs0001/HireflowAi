import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { InterStatusEnum } from "@prisma/client";

interface InterviewItem {
  id: string;
  interviewTime: Date | null;
  interViewStatus: InterStatusEnum;
  candidate: { name: string | null };
  application: { job: { title: string } } | null;
}

interface Props {
  interviews: InterviewItem[];
}

const STATUS_DISPLAY: Record<InterStatusEnum, string> = {
  SCHEDULED: "Upcoming",
  IN_PROGRESS: "Live",
  COMPLETED: "Completed",
};

export default function InterviewsToday({ interviews }: Props) {
  if (interviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No interviews scheduled today.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Interviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {interviews.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>
                  {(item.candidate.name ?? "??").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{item.candidate.name ?? "Unknown"}</p>
                <p className="text-sm text-muted-foreground">
                  {item.application?.job.title ?? "—"}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p>{item.interviewTime ? format(item.interviewTime, "h:mm a") : "—"}</p>
              <Badge>{STATUS_DISPLAY[item.interViewStatus]}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}