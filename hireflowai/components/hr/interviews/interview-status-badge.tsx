import { Badge } from "@/components/ui/badge";

interface Props {
  status: "Scheduled" | "In Progress" | "Completed";
}

export default function InterviewStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "Scheduled":
      return <Badge>Scheduled</Badge>;

    case "In Progress":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-500">
          In Progress
        </Badge>
      );

    default:
      return (
        <Badge className="bg-green-500 hover:bg-green-500">
          Completed
        </Badge>
      );
  }
}