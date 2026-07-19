"use client";

import { ColumnDef } from "@tanstack/react-table";

import InterviewStatusBadge from "./interview-status-badge";
import InterviewActions from "./interview-actions";

import { Interview } from "./types";

export const columns: ColumnDef<Interview>[] = [
  {
    accessorKey: "name",
    header: "Candidate",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "interviewTime",
    header: "Interview Time",
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => (
      <InterviewStatusBadge
        status={row.original.status}
      />
    ),
  },

  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => (
      <InterviewActions
        interviewLink={row.original.interviewLink}
        resumeLink={row.original.resumeLink}
      />
    ),
  },
];