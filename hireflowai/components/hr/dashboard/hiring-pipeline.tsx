import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stages = [
  ["Applied", 90],
  ["Screening", 70],
  ["Interview", 45],
  ["Technical", 32],
  ["Offer", 18],
];

export default function HiringPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Pipeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {stages.map(([name, value]) => (
          <div key={name}>
            <div className="mb-2 flex justify-between">
              <span>{name}</span>
              <span>{value}%</span>
            </div>

            <Progress value={Number(value)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}