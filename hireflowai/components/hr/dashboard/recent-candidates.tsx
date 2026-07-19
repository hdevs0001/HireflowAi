import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

const candidates = [
  {
    name: "Rahul",
    role: "React Developer",
    score: 94,
    status: "Interview",
  },
  {
    name: "Aman",
    role: "Backend",
    score: 88,
    status: "Screening",
  },
  {
    name: "Priya",
    role: "Designer",
    score: 97,
    status: "Selected",
  },
];

export default function RecentCandidates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Candidates</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>AI Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.name}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>{candidate.score}</TableCell>
                <TableCell>
                  <Badge>{candidate.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}