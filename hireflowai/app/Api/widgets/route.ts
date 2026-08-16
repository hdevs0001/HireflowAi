import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getWidgets, createWidget } from "@/lib/queries/widgets";

export async function GET(req: NextRequest) {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const search = req.nextUrl.searchParams.get("search") ?? undefined;
  const page = req.nextUrl.searchParams.get("page");

  const result = await getWidgets({ companyId, search, page: page ? parseInt(page) : 1 });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (!body.widgetName?.trim()) {
    return NextResponse.json({ error: "Widget name is required" }, { status: 400 });
  }

  const widget = await createWidget({
    companyId,
    widgetName: body.widgetName,
    allowedDomains: Array.isArray(body.allowedDomains) ? body.allowedDomains : [],
  });

  return NextResponse.json(widget, { status: 201 });
}