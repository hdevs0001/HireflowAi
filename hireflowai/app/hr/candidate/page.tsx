import { getCandidates } from "@/lib/queries/candidates";
import { getWidgetsForCompany, getJobsForWidget } from "@/lib/queries/scope";
import CandidateTable from "@/components/hr/candidate/candidate-table";
import CandidateToolbar from "@/components/hr/candidate/candidate-toolbar";
import ScopeSelector from "@/components/shared/scope-selector";
import { CandidateStatusEnum } from "@prisma/client";
import { auth } from "@/auth";
import PaginationControls from "@/components/shared/pagination-controls";

interface PageProps {
  searchParams: Promise<{
    widget?: string;
    job?: string;
    status?: string;
    search?: string;
    sortBy?: string;
    sortDir?: string;
    page?: string;
  }>;
}

export default async function CandidatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth();
  const companyId = session?.user?.companyId;

  if (!companyId) return <div>Unauthorized</div>;

  const [{ rows, total, page, totalPages }, widgets, jobs] = await Promise.all([
    getCandidates({
      companyId,
      widgetId: params.widget,
      jobId: params.job,
      status: params.status as CandidateStatusEnum | undefined,
      search: params.search,
      sortBy: params.sortBy as
        | "appliedDate"
        | "aiScore"
        | "statusUpdatedAt"
        | undefined,
      sortDir: params.sortDir as "asc" | "desc" | undefined,
      page: params.page ? parseInt(params.page) : 1,
    }),
    getWidgetsForCompany(companyId),
    params.widget
      ? getJobsForWidget(companyId, params.widget)
      : Promise.resolve([]),
  ]);

  return (
    <div className="space-y-4 p-4">
      <ScopeSelector widgets={widgets} jobs={jobs} />
      <CandidateToolbar />
      <CandidateTable data={rows} />
      <div className="text-sm text-muted-foreground">
        Showing {rows.length} of {total} candidates — page {page} of{" "}
        {totalPages}
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={25}
      />
    </div>
  );
}
