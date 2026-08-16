import { Badge } from "@/components/ui/badge";
import { CandidateStatusEnum } from "@prisma/client";
import { STATUS_LABELS, STATUS_BADGE_STYLES } from "@/lib/utils/status-machine";

interface Props {
  status: CandidateStatusEnum;
}

export default function CandidateStatusBadge({ status }: Props) {
  return (
    <Badge className={STATUS_BADGE_STYLES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}