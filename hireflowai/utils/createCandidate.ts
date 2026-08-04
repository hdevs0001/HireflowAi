import { prisma } from "@/prisma";
import { ApiError } from "@/lib/error";

interface CreateCandidateInput {
  name: string;
  email: string;
  phone: string;
  resumePublicUrl: string;
  resumeUrl: string;
  companyId: string;
}

export default async function createCandidate(
  data: CreateCandidateInput,
) {
  // Check whether candidate already exists
  const existingCandidate = await prisma.candidate.findFirst({
    where: {
      companyId: data.companyId,
      OR: [
        {
          email: data.email,
        },
        {
          phone: data.phone,
        },
      ],
    },
    select: {
      id: true,
      email: true,
      phone: true,
    },
  });

  if (existingCandidate) {
    if (existingCandidate.email === data.email) {
      throw new ApiError(
        409,
        "A candidate with this email already exists.",
      );
    }

    if (existingCandidate.phone === data.phone) {
      throw new ApiError(
        409,
        "A candidate with this phone number already exists.",
      );
    }

    throw new ApiError(
      409,
      "Candidate already exists.",
    );
  }

  // Create candidate
  const candidate = await prisma.candidate.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      resumePublicUrl: data.resumePublicUrl,
      resumeUrl: data.resumeUrl,
      companyId: data.companyId,
    },
  });

  return candidate;
}