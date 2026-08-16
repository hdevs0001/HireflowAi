"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { WidgetRow } from "@/lib/queries/widgets";

export const columns: ColumnDef<WidgetRow>[] = [
  {
    id: "widgetName",
    header: "Widget Name",
    cell: ({ row }) => (
      <Link href={`/hr/widget/${row.original.id}`} className="font-medium hover:underline">
        {row.original.widgetName ?? "Untitled Widget"}
      </Link>
    ),
  },
  {
    id: "jobs",
    header: "Jobs",
    cell: ({ row }) => row.original._count.jobs,
  },
  {
    id: "applications",
    header: "Applications",
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
    header: "Created",
    cell: ({ row }) => format(row.original.createdAt, "MMM d, yyyy"),
  },
];