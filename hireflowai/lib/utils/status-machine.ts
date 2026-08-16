import { CandidateStatusEnum } from "@prisma/client";

// States that are "done" - no further transitions possible
export const TERMINAL_STATUSES: CandidateStatusEnum[] = [
  "PLACED",
  "REJECTED",
  "WITHDRAW",
];

// Which statuses a given status is allowed to move to
export const ALLOWED_TRANSITIONS: Record<CandidateStatusEnum, CandidateStatusEnum[]> = {
  UNEVALUATED: ["RECOMMENDED", "REJECTED", "WITHDRAW"],
  RECOMMENDED: ["INTERVIEWING", "REJECTED", "WITHDRAW"],
  INTERVIEWING: ["OFFERED", "REJECTED", "WITHDRAW"],
  OFFERED: ["ON_TRIAL", "PLACED", "REJECTED", "WITHDRAW"], // some companies skip trial
  ON_TRIAL: ["PLACED", "REJECTED", "WITHDRAW"],
  PLACED: [],
  REJECTED: [],
  WITHDRAW: [],
};

export function isValidTransition(
  from: CandidateStatusEnum,
  to: CandidateStatusEnum
): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isTerminal(status: CandidateStatusEnum): boolean {
  return TERMINAL_STATUSES.includes(status);
}

// Human-readable labels for the UI (badges, dropdowns)
export const STATUS_LABELS: Record<CandidateStatusEnum, string> = {
  UNEVALUATED: "Unevaluated",
  RECOMMENDED: "Recommended",
  INTERVIEWING: "Interviewing",
  OFFERED: "Offered",
  ON_TRIAL: "On Trial",
  PLACED: "Hired", // UI label differs from enum value - see our earlier discussion
  REJECTED: "Rejected",
  WITHDRAW: "Withdrawn",
};

// Color variants matching shadcn Badge - adjust to your badge component's variant names
// Tailwind classes matching your existing badge pattern (bg-color + hover:bg-color)
export const STATUS_BADGE_STYLES: Record<CandidateStatusEnum, string> = {
  UNEVALUATED: "bg-gray-400 hover:bg-gray-400",
  RECOMMENDED: "bg-blue-500 hover:bg-blue-500",
  INTERVIEWING: "bg-indigo-500 hover:bg-indigo-500",
  OFFERED: "bg-amber-500 hover:bg-amber-500",
  ON_TRIAL: "bg-purple-500 hover:bg-purple-500",
  PLACED: "bg-green-500 hover:bg-green-500",
  REJECTED: "bg-red-500 hover:bg-red-500",
  WITHDRAW: "bg-neutral-400 hover:bg-neutral-400",
};