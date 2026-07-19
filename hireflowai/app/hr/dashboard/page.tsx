import DashboardStats from "@/components/hr/dashboard/dashboard-stats";
import InterviewsToday from "@/components/hr/dashboard/interviews-today";
import RecentCandidates from "@/components/hr/dashboard/recent-candidates";
import HiringPipeline from "@/components/hr/dashboard/hiring-pipeline";
import UpcomingInterviews from "@/components/hr/dashboard/upcoming-interviews";
import AIInsights from "@/components/hr/dashboard/ai-insights";
import QuickActions from "@/components/hr/dashboard/quick-actions";
import RecentActivity from "@/components/hr/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">HR Dashboard</h1>

        <p className="text-muted-foreground">
          Welcome back! Here's today's hiring overview.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RecentCandidates />
          <HiringPipeline />
        </div>

        <div className="space-y-6">
          <InterviewsToday />
          <UpcomingInterviews />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AIInsights />
        <RecentActivity />
      </div>

      <QuickActions />
    </main>
  );
}
