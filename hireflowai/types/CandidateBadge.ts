import { Candidate } from "@/action/candidate";
export const statusStyles: Record<Candidate["status"], string> = {
  REJECTED: "!bg-red-100 !text-red-700 !border-red-200",
  RECOMMENDED: "!bg-green-100 !text-green-700 !border-green-200",
  INTERVIEWING: "!bg-blue-100 !text-blue-700 !border-blue-200",
  OFFERED: "!bg-purple-100 !text-purple-700 !border-purple-200",
  ON_TRIAL: "!bg-yellow-100 !text-yellow-700 !border-yellow-200",
  PLACED: "!bg-emerald-200 !text-emerald-700 !border-emerald-200",
  WITHDRAW: "!bg-gray-100 !text-gray-700 !border-gray-200",
};
