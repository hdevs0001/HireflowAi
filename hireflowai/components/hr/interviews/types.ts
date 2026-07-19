export type InterviewStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed";

export interface Interview {
  id: string;

  name: string;

  email: string;

  interviewTime: string;

  interviewLink: string;

  resumeLink: string;

  status: InterviewStatus;
}