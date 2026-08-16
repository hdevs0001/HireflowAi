import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { isValidTransition } from "@/lib/utils/status-machine";
import { sendOfferEmail } from "@/lib/webhooks/n8n";
import { recordStatusChange } from "@/lib/utils/record-status-change";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const application = await prisma.application.findFirst({
    where: { id, companyId },
    include: { candidate: true, job: true },
  });

  if (!application)
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );

  if (!isValidTransition(application.candidateStatus, "OFFERED")) {
    return NextResponse.json(
      { error: `Cannot send offer from status ${application.candidateStatus}` },
      { status: 400 },
    );
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.application.update({
      where: { id },
      data: { candidateStatus: "OFFERED", statusUpdatedAt: new Date() },
    });

    await recordStatusChange(tx, {
      applicationId: id,
      companyId,
      fromStatus: application.candidateStatus,
      toStatus: "OFFERED",
    });

    return result;
  });

  if (application.candidate.email) {
    await sendOfferEmail({
      candidateEmail: application.candidate.email,
      candidateName: application.candidate.name ?? "Candidate",
      jobTitle: application.job.title,
    });
  }

  return NextResponse.json(updated);
}
