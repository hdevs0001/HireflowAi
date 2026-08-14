import { getAnalytics } from "@/action/analytics";

import { AnalyticsCards } from "@/components/analytics/analytics-cards";
import { CandidateChart } from "@/components/analytics/candidate-chart";
import { ResumePerformance } from "@/components/analytics/resume-performance";

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>

        <p className="text-muted-foreground">
          Monitor recruitment performance and AI insights.
        </p>
      </div>

      <AnalyticsCards
        totalCandidates={analytics.totalCandidates}
        accepted={analytics.recommended}
        rejected={analytics.rejected}
        interviewing={analytics.interviewing}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CandidateChart
            accepted={analytics.recommended}
            rejected={analytics.rejected}
            interviewing={analytics.interviewing}
          />
        </div>

        <ResumePerformance score={analytics.averageResumeScore} />
      </div>
    </div>
  );
}
