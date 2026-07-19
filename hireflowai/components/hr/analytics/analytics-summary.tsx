import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Hiring Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex justify-between">
          <span>Acceptance Rate</span>
          <strong>27.4%</strong>
        </div>

        <div className="flex justify-between">
          <span>Interview Rate</span>
          <strong>14.9%</strong>
        </div>

        <div className="flex justify-between">
          <span>Rejection Rate</span>
          <strong>57.7%</strong>
        </div>

        <div className="flex justify-between">
          <span>Average AI Resume Score</span>
          <strong>84 / 100</strong>
        </div>

      </CardContent>
    </Card>
  );
}