import {
  getInterviews,
  getInterviewViewCounts,
  InterviewView,
} from "@/lib/queries/interviews";
import { auth } from "@/auth";
import InterviewTable from "@/components/hr/interviews/interview-table";
import InterviewToolbar from "@/components/hr/interviews/interview-toolbar";
import PaginationControls from "@/components/shared/pagination-controls";

interface PageProps {
  searchParams: Promise<{ view?: string; search?: string; page?: string }>;
}

export default async function InterviewPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return <div>Unauthorized</div>;

  const [{ rows, total, page, totalPages, pageSize }, counts] =
    await Promise.all([
      getInterviews({
        companyId,
        view: params.view as InterviewView | undefined,
        search: params.search,
        page: params.page ? parseInt(params.page) : 1,
      }),
      getInterviewViewCounts(companyId),
    ]);

  return (
    <div className="space-y-4 p-4">
      <InterviewToolbar counts={counts} />
      <InterviewTable data={rows} />
      <p className="text-sm text-muted-foreground">
        Showing {rows.length} of {total} interviews
      </p>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
}
