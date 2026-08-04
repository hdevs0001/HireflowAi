"use server";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  aiScore: number;
  status:
    | "REJECTED"
    | "RECOMMENDED"
    | "INTERVIEWING"
    | "OFFERED"
    | "ON_TRIAL"
    | "PLACED"
    | "WITHDRAW";
}

export async function getAllCandidates(): Promise<Candidate[]> {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      resume: "https://res.cloudinary.com/demo/raw/upload/resume1.pdf",
      aiScore: 91,
      status: "INTERVIEWING",
    },
    {
      id: "2",
      name: "Emma Watson",
      email: "emma@example.com",
      phone: "+1 123 456 789",
      resume: "https://res.cloudinary.com/demo/raw/upload/resume2.pdf",
      aiScore: 96,
      status: "RECOMMENDED",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 765 432 109",
      resume: "https://res.cloudinary.com/demo/raw/upload/resume3.pdf",
      aiScore: 62,
      status: "REJECTED",
    },
    {
      id: "4",
      name: "Sophia Brown",
      email: "sophia@example.com",
      phone: "+1 999 888 777",
      resume: "https://res.cloudinary.com/demo/raw/upload/resume4.pdf",
      aiScore: 89,
      status: "PLACED",
    },
  ];
}
