import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { STATUS_LABELS } from "@/lib/utils/status-machine";
import { CandidateStatusEnum } from "@prisma/client";

interface Props {
  funnel: { stage: CandidateStatusEnum; count: number; percent: number }[];
}

export default function HiringPipeline({ funnel }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Pipeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {funnel.map((stage) => (
          <div key={stage.stage}>
            <div className="mb-2 flex justify-between">
              <span>{STATUS_LABELS[stage.stage]}</span>
              <span>{stage.count} ({stage.percent}%)</span>
            </div>
            <Progress value={stage.percent} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}