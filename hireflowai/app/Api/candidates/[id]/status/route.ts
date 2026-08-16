import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { isValidTransition } from "@/lib/utils/status-machine";
import { recordStatusChange } from "@/lib/utils/record-status-change";
import { CandidateStatusEnum } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const newStatus = body.status as CandidateStatusEnum | undefined;

  if (!newStatus || !Object.values(CandidateStatusEnum).includes(newStatus)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

  const application = await prisma.application.findFirst({
    where: { id, companyId },
    select: { candidateStatus: true },
  });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  if (!isValidTransition(application.candidateStatus, newStatus)) {
    return NextResponse.json(
      { error: `Cannot move from ${application.candidateStatus} to ${newStatus}` },
      { status: 400 }
    );
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.application.update({
      where: { id },
      data: { candidateStatus: newStatus, statusUpdatedAt: new Date() },
    });

    await recordStatusChange(tx, {
      applicationId: id,
      companyId,
      fromStatus: application.candidateStatus,
      toStatus: newStatus,
    });

    return result;
  });

  return NextResponse.json(updated);
}