import { InterStatusEnum } from "@prisma/client";

export const INTERVIEW_STATUS_LABELS: Record<InterStatusEnum, string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const INTERVIEW_STATUS_STYLES: Record<InterStatusEnum, string> = {
  SCHEDULED: "", // default Badge styling, no override needed
  IN_PROGRESS: "bg-blue-500 hover:bg-blue-500",
  COMPLETED: "bg-green-500 hover:bg-green-500",
};