"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import InterviewStatusBadge from "./interview-status-badge";
import InterviewActions from "./interview-actions";
import { InterviewRow } from "@/lib/queries/interviews";
import { format } from "date-fns";

export const columns: ColumnDef<InterviewRow>[] = [
  {
    id: "name",
    header: "Candidate",
    cell: ({ row }) => {
      const appId = row.original.application?.id;
      if (!appId) return row.original.candidate.name ?? "—";

      return (
        <Link href={`/hr/candidate/${appId}#interviews`} className="font-medium hover:underline">
          {row.original.candidate.name ?? "—"}
        </Link>
      );
    },
  },
  {
    id: "email",
    header: "Email",
    accessorFn: (row) => row.candidate.email ?? "—",
  },
  {
    id: "job",
    header: "Job",
    accessorFn: (row) => row.application?.job.title ?? "—",
  },
  {
    id: "round",
    header: "Round",
    cell: ({ row }) => row.original.round.replace("_", " "),
  },
  {
    id: "interviewTime",
    header: "Interview Time",
    cell: ({ row }) =>
      row.original.interviewTime ? format(row.original.interviewTime, "MMM d, h:mm a") : "Not scheduled",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => <InterviewStatusBadge status={row.original.interViewStatus} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <InterviewActions
        interviewId={row.original.id}
        interviewLink={row.original.interviewLink}
        resumeLink={row.original.application?.resumePublicUrl ?? row.original.application?.resumeUrl ?? null}
        status={row.original.interViewStatus}
        outcome={row.original.outcome}
      />
    ),
  },
];