import InterviewTable from "@/components/hr/interviews/interview-table";
import InterviewToolbar from "@/components/hr/interviews/interview-toolbar";

import { Interview } from "@/components/hr/interviews/types";

const interviews: Interview[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    interviewTime: "15 Jul 2026 • 10:00 AM",
    interviewLink: "https://meet.google.com/abc-defg-hij",
    resumeLink:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
    status: "Scheduled",
  },

  {
    id: "2",
    name: "John Doe",
    email: "john@gmail.com",
    interviewTime: "15 Jul 2026 • 1:00 PM",
    interviewLink: "https://meet.google.com/xyz-abcd-efg",
    resumeLink:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
    status: "In Progress",
  },

  {
    id: "3",
    name: "Emily Watson",
    email: "emily@gmail.com",
    interviewTime: "16 Jul 2026 • 11:30 AM",
    interviewLink: "https://meet.google.com/qwe-rtyu-iop",
    resumeLink:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
    status: "Completed",
  },
];

export default function InterviewsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Interviews
        </h1>

        <p className="text-muted-foreground">
          Manage all scheduled interviews.
        </p>
      </div>

      <InterviewToolbar />

      <InterviewTable data={interviews} />
    </div>
  );
}