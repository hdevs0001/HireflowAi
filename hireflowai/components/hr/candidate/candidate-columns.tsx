"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import StatusChangeMenu from "./status-change-menu";
import CandidateScore from "./candidate-score";

import { CandidateRow } from "@/lib/queries/candidates";
import ScheduleInterviewDialog from "./schedule-interview-dialog";

export const columns: ColumnDef<CandidateRow>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/hr/candidate/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.candidate.name ?? "—"}
      </Link>
    ),
  },

  {
    id: "email",
    header: "Email",
    accessorFn: (row) => row.candidate.email ?? "—",
  },

  {
    id: "phone",
    header: "Phone",
    accessorFn: (row) => row.candidate.phone ?? "—",
  },

  {
    id: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const url = row.original.resumePublicUrl ?? row.original.resumeUrl;
      if (!url)
        return <span className="text-muted-foreground text-sm">No resume</span>;

      return (
        <Button variant="outline" size="sm">
          <a href={url} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </Button>
      );
    },
  },

  {
    id: "aiScore",
    header: "AI Score",
    cell: ({ row }) => {
      const score = row.original.aiEvaluation?.aiScore;
      if (score === undefined) {
        return <span className="text-muted-foreground text-sm">Pending</span>;
      }
      return <CandidateScore score={score} />;
    },
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusChangeMenu
        applicationId={row.original.id}
        currentStatus={row.original.candidateStatus}
      />
    ),
  },

  {
    id: "nextAction",
    header: "Next Action",
    cell: ({ row }) => {
      const { label, urgent } = row.original.nextAction;
      const isScheduleAction =
        row.original.candidateStatus === "INTERVIEWING" &&
        row.original.interviews.length === 0;

      if (isScheduleAction) {
        return <ScheduleInterviewDialog applicationId={row.original.id} />;
      }

      return (
        <span
          className={
            urgent ? "text-red-600 font-medium" : "text-muted-foreground"
          }
        >
          {label}
        </span>
      );
    },
  },
];
