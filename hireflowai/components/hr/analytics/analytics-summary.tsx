import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  summary: {
    acceptanceRate: number;
    interviewRate: number;
    rejectionRate: number;
    averageAiScore: number | null;
  };
}

export default function AnalyticsSummary({ summary }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Acceptance Rate</span>
          <strong>{summary.acceptanceRate}%</strong>
        </div>
        <div className="flex justify-between">
          <span>Interview Rate</span>
          <strong>{summary.interviewRate}%</strong>
        </div>
        <div className="flex justify-between">
          <span>Rejection Rate</span>
          <strong>{summary.rejectionRate}%</strong>
        </div>
        <div className="flex justify-between">
          <span>Average AI Resume Score</span>
          <strong>{summary.averageAiScore !== null ? `${summary.averageAiScore} / 100` : "—"}</strong>
        </div>
      </CardContent>
    </Card>
  );
}