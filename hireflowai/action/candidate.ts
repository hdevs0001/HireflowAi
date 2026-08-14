"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";

export interface Candidate {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  resume: string | null;
  aiScore: number | null;
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
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.companyId) {
    throw new Error("User is not associated with a company");
  }

  const candidates = await prisma.candidate.findMany({
    where: {
      companyId: user.companyId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,

      // candidateStatus no longer lives on Candidate — see note below
      applications: {
        select: {
          resumePublicUrl: true,
          candidateStatus: true,
          aiEvaluation: {
            select: { aiScore: true },
          },
        },
        orderBy: { createdAt: "desc" },
        // take: 1, // most recent application only
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return candidates.map((candidate) => {
    const latestApplication = candidate.applications[0];

    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      resume: latestApplication.resumePublicUrl,
      aiScore: latestApplication?.aiEvaluation?.aiScore ?? null,
      status: latestApplication?.candidateStatus ?? "UNEVALUATED",
    };
  });
}
