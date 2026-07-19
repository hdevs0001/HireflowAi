import CandidateToolbar from "@/components/hr/candidate/candidate-toolbar";
import CandidateTable from "@/components/hr/candidate/candidate-table";

import { Candidate } from "@/components/hr/candidate/types";

const data: Candidate[] = [
  {
    id: "1",

    name: "Rahul Sharma",

    email: "rahul@gmail.com",

    phone: "9876543210",

    resume:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",

    aiScore: 96,

    status: "Interviewing",
  },

  {
    id: "2",

    name: "John Doe",

    email: "john@gmail.com",

    phone: "9876543211",

    resume:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",

    aiScore: 88,

    status: "Accepted",
  },

  {
    id: "3",

    name: "Aman Singh",

    email: "aman@gmail.com",

    phone: "9876543212",

    resume:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",

    aiScore: 63,

    status: "Rejected",
  },

  {
    id: "4",

    name: "Emily Watson",

    email: "emily@gmail.com",

    phone: "9876543213",

    resume:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",

    aiScore: 92,

    status: "Interviewing",
  },

  {
    id: "5",

    name: "David Lee",

    email: "david@gmail.com",

    phone: "9876543214",

    resume:
      "https://res.cloudinary.com/demo/raw/upload/sample.pdf",

    aiScore: 98,

    status: "Accepted",
  },
];

export default function CandidatePage() {
  return (
    <div className="space-y-6 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Candidates
        </h1>

        <p className="text-muted-foreground">
          Manage all candidates from one place.
        </p>

      </div>

      <CandidateToolbar />

      <CandidateTable data={data} />

    </div>
  );
}