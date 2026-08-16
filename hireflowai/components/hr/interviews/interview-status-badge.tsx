import { Badge } from "@/components/ui/badge";
import { InterStatusEnum } from "@prisma/client";
import {
  INTERVIEW_STATUS_LABELS,
  INTERVIEW_STATUS_STYLES,
} from "@/lib/utils/interview-status";

interface Props {
  status: InterStatusEnum;
}

export default function InterviewStatusBadge({ status }: Props) {
  return (
    <Badge className={INTERVIEW_STATUS_STYLES[status]}>
      {INTERVIEW_STATUS_LABELS[status]}
    </Badge>
  );
}