import { DashboardStats } from "@/components/dashboard/dashboardstats";
import { getDashboardStats } from "@/action/dashboard";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  if (!stats) {
    return (
      <div style={{ padding: 24 }}>
        <p>
          Your account isn't yet associated with a company. Please contact your
          administrator.
        </p>
      </div>
    );
  }
  return (
    <main className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">
          Welcome back. Here's what's happening today.
        </p>
      </div>

      <DashboardStats stats={stats} />
    </main>
  );
}
