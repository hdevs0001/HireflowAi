import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { submitInterviewFeedback } from "@/lib/queries/interviews";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (!body.outcome || !["PASS", "FAIL"].includes(body.outcome)) {
    return NextResponse.json({ error: "Outcome must be PASS or FAIL" }, { status: 400 });
  }

  if (!body.feedback?.trim()) {
    return NextResponse.json({ error: "Feedback notes are required" }, { status: 400 });
  }

  const updated = await submitInterviewFeedback(id, companyId, {
    feedback: body.feedback,
    feedbackScore: body.feedbackScore ?? 0,
    outcome: body.outcome,
  });

  if (!updated) return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  return NextResponse.json(updated);
}