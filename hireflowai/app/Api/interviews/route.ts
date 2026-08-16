import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { scheduleInterview } from "@/lib/queries/interviews";
import { sendInterviewInviteEmail } from "@/lib/webhooks/n8n";
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (!body.applicationId || !body.round || !body.interviewTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Tenant guard + pull candidate/job info for the email
  const application = await prisma.application.findFirst({
    where: { id: body.applicationId, companyId },
    include: { candidate: true, job: true },
  });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const interview = await scheduleInterview({
    companyId,
    candidateId: application.candidateId,
    applicationId: application.id,
    round: body.round,
    interviewTime: new Date(body.interviewTime),
    interviewerName: body.interviewerName || undefined,
  });

  if (application.candidate.email) {
    await sendInterviewInviteEmail({
      candidateEmail: application.candidate.email,
      candidateName: application.candidate.name ?? "Candidate",
      jobTitle: application.job.title,
      round: body.round,
      interviewTime: interview.interviewTime!,
      interviewLink: interview.interviewLink!,
    });
  }

  return NextResponse.json(interview, { status: 201 });
}