import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p>🔥 8 candidates have AI score above 90.</p>
        <p>⚡ 5 interviews need scheduling.</p>
        <p>📄 14 resumes processed today.</p>
        <p>⭐ Average resume score: 84.</p>
      </CardContent>
    </Card>
  );
}