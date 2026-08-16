import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  insights: {
    highScoreCount: number;
    needsSchedulingCount: number;
    resumesProcessedToday: number;
    averageScore: number | null;
  };
}

export default function AIInsights({ insights }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p>🔥 {insights.highScoreCount} candidates have AI score above 90.</p>
        <p>⚡ {insights.needsSchedulingCount} interviews need scheduling.</p>
        <p>📄 {insights.resumesProcessedToday} resumes processed today.</p>
        <p>
          ⭐ Average resume score:{" "}
          {insights.averageScore !== null ? insights.averageScore : "—"}.
        </p>
      </CardContent>
    </Card>
  );
}