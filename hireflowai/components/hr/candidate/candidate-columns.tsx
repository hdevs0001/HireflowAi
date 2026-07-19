"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import CandidateStatusBadge from "./candidate-status-badge";
import CandidateScore from "./candidate-score";

import { Candidate } from "./types";

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "resume",

    header: "Resume",

    cell: ({ row }) => (
      <Button
       
        variant="outline"
        size="sm"
      >
        <a
          href={row.original.resume}
          target="_blank"
        >
          View Resume
        </a>
      </Button>
    ),
  },

  {
    accessorKey: "aiScore",

    header: "AI Score",

    cell: ({ row }) => (
      <CandidateScore
        score={row.original.aiScore}
      />
    ),
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => (
      <CandidateStatusBadge
        status={row.original.status}
      />
    ),
  },
];