import { prisma } from "@/prisma";
import { CandidateStatusEnum, PrismaClient } from "@prisma/client";

export async function recordStatusChange(
  tx: PrismaClient | Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0],
  params: {
    applicationId: string;
    companyId: string;
    fromStatus: CandidateStatusEnum | null;
    toStatus: CandidateStatusEnum;
  }
) {
  await tx.statusHistory.create({
    data: {
      applicationId: params.applicationId,
      companyId: params.companyId,
      fromStatus: params.fromStatus,
      toStatus: params.toStatus,
    },
  });
}