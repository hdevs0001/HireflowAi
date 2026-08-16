import { getWidgetDetail } from "@/lib/queries/widgets";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { STATUS_LABELS } from "@/lib/utils/status-machine";
import { CandidateStatusEnum } from "@prisma/client";
import WidgetFormDialog from "@/components/hr/widget/widget-form-dialog";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ widgetId: string }>;
}

export default async function WidgetDetailPage({ params }: PageProps) {
  const { widgetId } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return <div>Unauthorized</div>;

  const widget = await getWidgetDetail(widgetId, companyId);
  if (!widget) notFound();

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{widget.widgetName ?? "Untitled Widget"}</h1>
          <p className="text-sm text-muted-foreground">
            {widget._count.applications} total applications
          </p>
        </div>
        <WidgetFormDialog
          widget={widget}
          trigger={<Button variant="outline">Edit Widget</Button>}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {widget.statusBreakdown.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications yet.</p>
          ) : (
            widget.statusBreakdown.map((s) => (
              <Link key={s.candidateStatus} href={`/hr/candidate?widget=${widgetId}&status=${s.candidateStatus}`}>
                <Badge variant="secondary" className="text-sm">
                  {STATUS_LABELS[s.candidateStatus as CandidateStatusEnum]}: {s._count}
                </Badge>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Jobs on this Widget</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {widget.jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No jobs linked to this widget yet.</p>
          ) : (
            widget.jobs.map(({ job }) => (
              <Link
                key={job.id}
                href={`/hr/candidate?widget=${widgetId}&job=${job.id}`}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors"
              >
                <span className="font-medium">{job.title}</span>
                <span className="text-sm text-muted-foreground">
                  {job._count.applications} applicants
                </span>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Embed Snippet</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded-lg p-3 text-xs overflow-x-auto">
            {`<script src="https://yourapp.com/embed.js" data-widget-id="${widget.widgetId}"></script>`}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">
            Place this snippet on your website to embed the application form.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}