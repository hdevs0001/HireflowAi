"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser"; // adjust path

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
    | "WITHDRAW"
    | "UNEVALUATED";
}

export async function getAllCandidates(): Promise<Candidate[]> {
  // 1. Authentication check
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // 2. Company check
  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  // 3. Fetch ONLY candidates belonging to this company
  const candidates = await prisma.candidate.findMany({
    where: {
      companyId: user.companyId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      resumePublicUrl: true,
      candidateStatus: true,

      AIEvaluation: {
        select: {
          aiScore: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return candidates.map((candidate) => ({
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    resume: candidate.resumePublicUrl,
    aiScore: candidate.AIEvaluation?.aiScore ?? 0,
    status: candidate.candidateStatus,
  }));
}