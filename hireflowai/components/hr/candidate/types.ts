export type CandidateStatus =
  | "Accepted"
  | "Interviewing"
  | "Rejected";

export interface Candidate {
  id: string;

  name: string;

  email: string;

  phone: string;

  resume: string;

  aiScore: number;

  status: CandidateStatus;
}