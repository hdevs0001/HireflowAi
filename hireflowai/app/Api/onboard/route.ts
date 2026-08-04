import { auth } from "@/auth";
import { onboardSchema } from "@/lib/validation/onboard";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
    console.log("API HIT");
  if (!session || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        message: "Please Login First",
      },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const result = onboardSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }
    const { companyName, email, address } = result.data;
    const existingEmail = await prisma.company.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "A company With This Email Already Exists.",
        },
        {
          status: 409,
        },
      );
    }

    const company = await prisma.company.create({
      data: {
        companyName,
        email,
        address,
      },
    });
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        companyId: company.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Company created Successfully",
        company,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("onBoard Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
