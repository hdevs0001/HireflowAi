import { ApiError } from "@/lib/error";
import { NextResponse } from "next/server";

export default async function turnstileVerfication(token: string) {
  if (!token) {
    return NextResponse.json({
      successMessage: "invaild Request",
    });
  }

  //.  verify the token from the cloudflare
  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.CLOUDFLARE_SECRET_KEY!,
        response: token.toString(),
      }),
    },
  );
  const verifyResult = await verifyResponse.json();

  if (!verifyResult.success) {
    throw new ApiError(
      403,
      "Turnstile verification failed/Plz Refresh the Browser",
    );
  }
}
