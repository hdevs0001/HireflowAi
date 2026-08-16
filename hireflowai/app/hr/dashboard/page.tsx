import DashboardStats from "@/components/hr/dashboard/dashboard-stats";
import HiringPipeline from "@/components/hr/dashboard/hiring-pipeline";
import InterviewsToday from "@/components/hr/dashboard/interviews-today";
import RecentActivity from "@/components/hr/dashboard/recent-activity";
import AIInsights from "@/components/hr/dashboard/ai-insights";
import QuickActions from "@/components/hr/dashboard/quick-actions";
import { auth } from "@/auth";
import {
  getDashboardStats,
  getPipelineFunnel,
  getRecentActivity,
  getInterviewsToday,
  getAIInsights,
  getNeedsAttention,
} from "@/lib/queries/dashboard";
import NeedsAttentionPanel from "@/components/hr/dashboard/needs-attention-panel";
// ...other imports unchanged
export default async function DashboardPage() {
  const session = await auth();
  const companyId = session?.user?.companyId;

  if (!companyId) return <div>Unauthorized</div>;

  const [stats, funnel, interviews, activity, insights, attention] =
    await Promise.all([
      getDashboardStats(companyId),
      getPipelineFunnel(companyId),
      getInterviewsToday(companyId),
      getRecentActivity(companyId),
      getAIInsights(companyId),
      getNeedsAttention(companyId),
    ]);

  return (
    <div className="space-y-6 p-4">
      <DashboardStats stats={stats} />

      <NeedsAttentionPanel attention={attention} />

      <div className="grid gap-5 md:grid-cols-2">
        <HiringPipeline funnel={funnel} />
        <InterviewsToday interviews={interviews} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AIInsights insights={insights} />
        <QuickActions />
      </div>

      <RecentActivity activity={activity} />
    </div>
  );
}
