import { getAnalyticsCards, getAnalyticsSummary, getHiringTrend } from "@/lib/queries/analytics";
import { auth } from "@/auth";
import AnalyticsCards from "@/components/hr/analytics/analytics-cards";
import AnalyticsChart from "@/components/hr/analytics/analytics-chart";
import AnalyticsSummary from "@/components/hr/analytics/analytics-summary";

export default async function AnalyticsPage() {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return <div>Unauthorized</div>;

  const [cards, summary, trend] = await Promise.all([
    getAnalyticsCards(companyId),
    getAnalyticsSummary(companyId),
    getHiringTrend(companyId),
  ]);

  return (
    <div className="space-y-6 p-4">
      <AnalyticsCards data={cards} />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart data={trend} />
        </div>
        <AnalyticsSummary summary={summary} />
      </div>
    </div>
  );
}