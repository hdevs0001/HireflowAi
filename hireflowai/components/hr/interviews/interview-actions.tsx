"use client";

import { Button } from "@/components/ui/button";
import { Eye, Video } from "lucide-react";
import FeedbackDialog from "./feedback-dialog";
import { InterStatusEnum, InterviewOutcome } from "@prisma/client";

interface Props {
  interviewId: string;
  interviewLink: string | null;
  resumeLink: string | null;
  status: InterStatusEnum;
  outcome: InterviewOutcome | null;
}

export default function InterviewActions({
  interviewId,
  interviewLink,
  resumeLink,
  status,
  outcome,
}: Props) {
  // Any interview without a recorded outcome yet can have feedback submitted -
  // regardless of its current status. Submitting feedback IS what completes it.
  const canSubmitFeedback = outcome === null;

  return (
    <div className="flex gap-2">
      {resumeLink && (
        <Button variant="outline" size="sm" >
          <a href={resumeLink} target="_blank" rel="noopener noreferrer">
            <Eye className="mr-2 h-4 w-4" />
            Resume
          </a>
        </Button>
      )}

      {interviewLink && canSubmitFeedback && (
        <Button variant="outline" size="sm" >
          <a href={interviewLink} target="_blank" rel="noopener noreferrer">
            <Video className="mr-2 h-4 w-4" />
            Join
          </a>
        </Button>
      )}

      {canSubmitFeedback && <FeedbackDialog interviewId={interviewId} />}
    </div>
  );
}