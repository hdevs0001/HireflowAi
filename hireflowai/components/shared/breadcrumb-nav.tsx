"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PAGE_LABELS: Record<string, string> = {
  "/hr/dashboard": "Dashboard",
  "/hr/candidate": "Candidates",
  "/hr/interview": "Interviews",
  "/hr/analytics": "Analytics",
};

export function BreadcrumbNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const widgetId = searchParams.get("widget");
  const jobId = searchParams.get("job");
  const status = searchParams.get("status");

  const [labels, setLabels] = useState<{ widgetName: string | null; jobTitle: string | null }>({
    widgetName: null,
    jobTitle: null,
  });

  useEffect(() => {
    if (!widgetId && !jobId) {
      setLabels({ widgetName: null, jobTitle: null });
      return;
    }

    const params = new URLSearchParams();
    if (widgetId) params.set("widget", widgetId);
    if (jobId) params.set("job", jobId);

    fetch(`/api/scope-labels?${params.toString()}`)
      .then((res) => res.json())
      .then(setLabels)
      .catch(() => setLabels({ widgetName: null, jobTitle: null }));
  }, [widgetId, jobId]);

  const pageLabel = PAGE_LABELS[pathname] ?? "All Hiring";

  const crumbs: { label: string; href?: string }[] = [
    { label: pageLabel, href: pathname },
  ];

  if (labels.widgetName) {
    crumbs.push({ label: labels.widgetName, href: `${pathname}?widget=${widgetId}` });
  }
  if (labels.jobTitle) {
    crumbs.push({ label: labels.jobTitle });
  }
  if (status) {
    crumbs.push({ label: status.charAt(0) + status.slice(1).toLowerCase() });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <div key={i} className="flex items-center gap-1.5">
              <BreadcrumbItem className={i === 0 ? "hidden md:block" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}