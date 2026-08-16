import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getScopeLabels } from "@/lib/queries/scope";

export async function GET(req: NextRequest) {
  const session = await auth();
  const companyId = session?.user?.companyId;

  if (!companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const widgetId = req.nextUrl.searchParams.get("widget") ?? undefined;
  const jobId = req.nextUrl.searchParams.get("job") ?? undefined;

  const labels = await getScopeLabels(companyId, widgetId, jobId);
  return NextResponse.json(labels);
}