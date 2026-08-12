// quick throwaway check — e.g. in app/api/redis-test/route.ts, delete after testing
import { redis } from "@/lib/redis/redis";
import { NextResponse } from "next/server";

export async function GET() {
  await redis.set("healthcheck", "ok", "EX", 10);
  const value = await redis.get("healthcheck");
  return NextResponse.json({ value });
}
