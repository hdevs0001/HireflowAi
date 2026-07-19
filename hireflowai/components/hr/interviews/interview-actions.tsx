"use client";

import { Button } from "@/components/ui/button";
import { Eye, Video } from "lucide-react";

interface Props {
  interviewLink: string;
  resumeLink: string;
}

export default function InterviewActions({ interviewLink, resumeLink }: Props) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <a href={resumeLink} target="_blank">
          <Eye className="mr-2 h-4 w-4" />
          Resume
        </a>
      </Button>

      <Button size="sm">
        <a href={interviewLink} target="_blank">
          <Video className="mr-2 h-4 w-4" />
          Start Interview
        </a>
      </Button>
    </div>
  );
}
