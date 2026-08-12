// app/api/widget/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET(req: NextRequest) {
  try {
    const widgetId = req.nextUrl.searchParams.get("widgetId");
    const parentOrigin = req.nextUrl.searchParams.get("parentOrigin"); // ← from the query string,
    //    same as /api/widget/session

    if (!widgetId) {
      return NextResponse.json(
        { success: false, message: "widgetId is required" },
        { status: 400 },
      );
    }

    const widget = await prisma.widget.findUnique({
      where: { widgetId },
      select: { isActive: true, allowedDomains: true, companyId: true },
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

    const jobs = await prisma.job.findMany({
      where: { companyId: widget.companyId, isActive: true },
      select: { id: true, title: true, description: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, jobs });
  } catch (err) {
    console.error("[widget/jobs] error:", err);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 },
    );
  }
}
