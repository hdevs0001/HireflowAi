import { prisma } from "@/prisma";

export async function getWidgetsForCompany(companyId: string) {
  return prisma.widget.findMany({
    where: { companyId, isActive: true },
    select: { id: true, widgetId: true, widgetName: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobsForWidget(companyId: string, widgetId: string) {
  const links = await prisma.widgetJob.findMany({
    where: { widgetId, widget: { companyId } },
    select: { job: { select: { id: true, title: true } } },
  });

  return links.map((l) => l.job);
}

export async function getScopeLabels(
  companyId: string,
  widgetId?: string,
  jobId?: string
) {
  const [widget, job] = await Promise.all([
    widgetId
      ? prisma.widget.findFirst({ where: { id: widgetId, companyId }, select: { widgetName: true } })
      : null,
    jobId
      ? prisma.job.findFirst({ where: { id: jobId, companyId }, select: { title: true } })
      : null,
  ]);

  return {
    widgetName: widget?.widgetName ?? null,
    jobTitle: job?.title ?? null,
  };
}