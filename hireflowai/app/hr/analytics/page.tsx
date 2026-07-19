import AnalyticsCards from "@/components/hr/analytics/analytics-cards";
import AnalyticsChart from "@/components/hr/analytics/analytics-chart";
import AnalyticsSummary from "@/components/hr/analytics/analytics-summary";

export default function AnalyticsPage() {
  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>

        <p className="text-muted-foreground">
          Recruitment analytics and hiring performance.
        </p>
      </div>

      <AnalyticsCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>

        <AnalyticsSummary />
      </div>
    </main>
  );
}
