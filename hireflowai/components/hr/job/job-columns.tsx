"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { JobRow } from "@/lib/queries/jobs";
import JobFormDialog from "./job-form-dialog";

interface WidgetOption {
  id: string;
  widgetName: string | null;
}

export function getJobColumns(widgets: WidgetOption[]): ColumnDef<JobRow>[] {
  return [
    {
      id: "title",
      header: "Job Title",
      cell: ({ row }) => (
        <Link href={`/hr/candidate?job=${row.original.id}`} className="font-medium hover:underline">
          {row.original.title}
        </Link>
      ),
    },
    {
      id: "applicants",
      header: "Applicants",
      cell: ({ row }) => row.original._count.applications,
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "createdAt",
      header: "Posted",
      cell: ({ row }) => format(row.original.createdAt, "MMM d, yyyy"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <JobFormDialog
          job={row.original}
          widgets={widgets}
          trigger={
            <Button variant="outline" size="sm">
              Edit
            </Button>
          }
        />
      ),
    },
  ];
}