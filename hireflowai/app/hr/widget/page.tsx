import { getWidgets } from "@/lib/queries/widgets";
import { auth } from "@/auth";
import WidgetTable from "@/components/hr/widget/widget-table";
import WidgetFormDialog from "@/components/hr/widget/widget-form-dialog";

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function WidgetsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return <div>Unauthorized</div>;

  const { rows, total } = await getWidgets({
    companyId,
    search: params.search,
    page: params.page ? parseInt(params.page) : 1,
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Widgets</h1>
        <WidgetFormDialog />
      </div>

      <WidgetTable data={rows} />

      <p className="text-sm text-muted-foreground">
        Showing {rows.length} of {total} widgets
      </p>
    </div>
  );
}