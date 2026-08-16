import { Application, Interview, CandidateStatusEnum } from "@prisma/client";
import { isTerminal } from "./status-machine";

// Application with the relations next-action logic needs
export type ApplicationWithInterviews = Application & {
  interviews: Interview[];
};

export interface NextAction {
  label: string;
  urgent: boolean; // drives highlighting in the UI (e.g. red text/icon)
}

const DAYS_UNTIL_OFFER_FOLLOWUP = 5;
const DAYS_UNTIL_RECOMMENDED_STALE = 2;

function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export function getNextAction(app: ApplicationWithInterviews): NextAction {
  const { candidateStatus, statusUpdatedAt, interviews } = app;

  if (isTerminal(candidateStatus)) {
    return { label: "No action needed", urgent: false };
  }

  switch (candidateStatus) {
    case "UNEVALUATED":
      return { label: "Awaiting AI evaluation", urgent: false };

    case "RECOMMENDED": {
      const stale = daysSince(statusUpdatedAt) > DAYS_UNTIL_RECOMMENDED_STALE;
      return {
        label: stale ? "Review & advance (waiting)" : "Review & advance",
        urgent: stale,
      };
    }

    case "INTERVIEWING": {
      if (interviews.length === 0) {
        return { label: "Schedule interview", urgent: true };
      }

      // Most recent interview drives the action
      const latest = [...interviews].sort(
        (a, b) => (b.interviewTime?.getTime() ?? 0) - (a.interviewTime?.getTime() ?? 0)
      )[0];

      if (latest.interViewStatus === "COMPLETED" && latest.outcome === null) {
        return { label: "Submit feedback", urgent: true };
      }

      if (latest.interViewStatus === "COMPLETED" && latest.outcome === "PASS") {
        return { label: "Advance to next round or offer", urgent: false };
      }

      if (latest.interViewStatus === "COMPLETED" && latest.outcome === "FAIL") {
        return { label: "Move to rejected", urgent: false };
      }

      if (latest.interViewStatus === "SCHEDULED") {
        return { label: "Interview scheduled", urgent: false };
      }

      return { label: "In progress", urgent: false };
    }

    case "OFFERED": {
      const waiting = daysSince(statusUpdatedAt) > DAYS_UNTIL_OFFER_FOLLOWUP;
      return {
        label: waiting ? "Follow up on offer" : "Awaiting candidate response",
        urgent: waiting,
      };
    }

    case "ON_TRIAL":
      return { label: "Monitor trial progress", urgent: false };

    default:
      return { label: "Review candidate", urgent: false };
  }
}