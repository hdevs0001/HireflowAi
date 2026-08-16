import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateWidget, deleteWidget } from "@/lib/queries/widgets";
import { Prisma } from "@prisma/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await updateWidget(id, companyId, {
    widgetName: body.widgetName,
    allowedDomains: body.allowedDomains,
    isActive: body.isActive,
  });

  if (!updated) return NextResponse.json({ error: "Widget not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const deleted = await deleteWidget(id, companyId);
    if (!deleted) return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
      return NextResponse.json(
        { error: "Can't delete a widget with existing applications. Deactivate it instead." },
        { status: 409 }
      );
    }
    throw err;
  }
}