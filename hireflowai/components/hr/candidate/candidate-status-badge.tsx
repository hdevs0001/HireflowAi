import { Badge } from "@/components/ui/badge";

interface Props {
  status: "Accepted" | "Interviewing" | "Rejected";
}

export default function CandidateStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "Accepted":
      return (
        <Badge className="bg-green-500 hover:bg-green-500">
          Accepted
        </Badge>
      );

    case "Interviewing":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-500">
          Interviewing
        </Badge>
      );

    default:
      return (
        <Badge variant="destructive">
          Rejected
        </Badge>
      );
  }
}