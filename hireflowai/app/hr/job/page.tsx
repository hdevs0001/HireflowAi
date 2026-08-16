import { getJobs } from "@/lib/queries/jobs";
import { getWidgetsForCompany } from "@/lib/queries/scope";
import { auth } from "@/auth";
import JobTable from "@/components/hr/job/job-table";
import JobFormDialog from "@/components/hr/job/job-form-dialog";
import PaginationControls from "@/components/shared/pagination-controls";

interface PageProps {
  searchParams: Promise<{ search?: string; filter?: string; page?: string }>;
}

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return <div>Unauthorized</div>;

  const [{ rows, total, page, totalPages, pageSize }, widgets] = await Promise.all([
    getJobs({
      companyId,
      search: params.search,
      filter: params.filter as "no-applicants" | "active" | "inactive" | undefined,
      page: params.page ? parseInt(params.page) : 1,
    }),
    getWidgetsForCompany(companyId),
  ]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Jobs {params.filter === "no-applicants" && "— No Applicants"}
        </h1>
        <JobFormDialog widgets={widgets} />
      </div>

      <JobTable data={rows} widgets={widgets} />

      <PaginationControls page={page} totalPages={totalPages} total={total} pageSize={pageSize} />
    </div>
  );
}