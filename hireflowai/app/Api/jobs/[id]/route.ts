import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateJob, deleteJob } from "@/lib/queries/jobs";
import { Prisma } from "@prisma/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await updateJob(id, companyId, {
    title: body.title,
    description: body.description,
    evaluationPrompt: body.evaluationPrompt,
    isActive: body.isActive,
  });

  if (!updated) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const deleted = await deleteJob(id, companyId);
    if (!deleted) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    // Foreign key violation - job has applications attached
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
      return NextResponse.json(
        { error: "Can't delete a job with existing applications. Deactivate it instead." },
        { status: 409 }
      );
    }
    throw err;
  }
}