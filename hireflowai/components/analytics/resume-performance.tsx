import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Props {
  score: number;
}

export function ResumePerformance({ score }: Props) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-xl font-semibold">
            Overall Resume Performance
          </h2>

          <p className="text-sm text-muted-foreground">
            Average AI Resume Score
          </p>
        </div>

        <Progress value={score} />

        <div className="text-4xl font-bold">
          {score}%
        </div>
      </CardContent>
    </Card>
  );
}