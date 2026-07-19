import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Candidate } from "@/action/candidate";

interface CandidateTableProps {
  candidates?: Candidate[];
}

export function CandidateTable({
  candidates = [],
}: CandidateTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>AI Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">
                {candidate.name}
              </TableCell>

              <TableCell>{candidate.email}</TableCell>

              <TableCell>{candidate.phone}</TableCell>

              <TableCell>
                <Link
                  href={candidate.resume}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </Link>
              </TableCell>

              <TableCell>
                {candidate.aiScore}%
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    candidate.status === "Accepted"
                      ? "default"
                      : candidate.status === "Rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {candidate.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}

          {candidates.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-muted-foreground"
              >
                No candidates found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}