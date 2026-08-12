// app/api/widget/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { createCandidateSession } from "@/lib/candidate_session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { widgetId, jobId, parentOrigin } = body;

    if (!widgetId) {
      return NextResponse.json(
        { success: false, message: "widgetId is required" },
        { status: 400 },
      );
    }

    const widget = await prisma.widget.findUnique({
      where: { widgetId },
      select: {
        id: true,
        isActive: true,
        allowedDomains: true,
        companyId: true,
      },
    });

    if (!widget || !widget.isActive) {
      return NextResponse.json(
        { success: false, message: "Invalid or inactive widget" },
        { status: 404 },
      );
    }

    if (!parentOrigin || !widget.allowedDomains.includes(parentOrigin)) {
      return NextResponse.json(
        { success: false, message: "Invalid widget origin" },
        { status: 403 },
      );
    }

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "jobId is required" },
        { status: 400 },
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, isActive: true, companyId: true },
    });

    if (!job || !job.isActive || job.companyId !== widget.companyId) {
      return NextResponse.json(
        { success: false, message: "Invalid job" },
        { status: 400 },
      );
    }

    const sessionId = await createCandidateSession({
      widgetId: widget.id,
      companyId: widget.companyId,
      jobId: job.id,
    });

    return NextResponse.json({ success: true, sessionId });
  } catch (err) {
    console.error("[widget/session] error:", err);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 },
    );
  }
}
// 411c0208-d65c-4c7a-b29c-060e076a707cF