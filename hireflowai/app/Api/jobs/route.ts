import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getJobs, createJob } from "@/lib/queries/jobs";

export async function GET(req: NextRequest) {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const search = req.nextUrl.searchParams.get("search") ?? undefined;
  const filter = req.nextUrl.searchParams.get("filter") as
    | "no-applicants"
    | "active"
    | "inactive"
    | undefined;
  const page = req.nextUrl.searchParams.get("page");

  const result = await getJobs({
    companyId,
    search,
    filter,
    page: page ? parseInt(page) : 1,
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (!body.title || !body.description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.widgetIds) || body.widgetIds.length === 0) {
    return NextResponse.json(
      { error: "Select at least one widget" },
      { status: 400 },
    );
  }

  const job = await createJob({
    companyId,
    title: body.title,
    description: body.description,
    evaluationPrompt: body.evaluationPrompt || undefined,
    widgetIds: body.widgetIds,
  });

  return NextResponse.json(job, { status: 201 });
}
