import crypto from "crypto";
import { redis } from "./redis/redis";

const SESSION_TTL_SECONDS = 60 * 40;
const BRIDGE_TOKEN_TTL_SECONDS = 60 * 40;

export interface CandidateSessionData {
  widgetId: string;
  companyId: string;
  jobId: string;
  verified: boolean;
  candidateId?: string;
  googleSub?: string;
  email?: string;
  bridgeIssued?: boolean;
}

function sessionKey(sessionId: string) {
  return `candidate-session:${sessionId}`;
}

function bridgeKey(token: string) {
  return `bridge:${token}`;
}

// called by api/widget/session before any google auth
export async function createCandidateSession({
  widgetId,
  companyId,
  jobId,
}: {
  widgetId: string;
  companyId: string;
  jobId: string;
}): Promise<string> {
  const sessionId = crypto.randomUUID();
  const data: CandidateSessionData = {
    widgetId,
    companyId,
    jobId,
    verified: false,
  };

  await redis.set(
    sessionKey(sessionId),
    JSON.stringify(data),
    "EX",
    SESSION_TTL_SECONDS,
  );
  return sessionId;
}
// read only  - used wherever you just need to inspect the state
export async function getCandidateSession(
  sessionId: string,
): Promise<CandidateSessionData | null> {
  const raw = await redis.get(sessionKey(sessionId));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CandidateSessionData;
  } catch {
    return null; // corrupted/malformed value — treat as no session, never throw
  }
}

// ── 3. Called by /candidate-auth/complete/page.tsx — AFTER Google confirms identity ──
export async function markCandidateSessionVerified(
  sessionId: string,
  identity: { candidateId: string; googleSub?: string; email: string },
): Promise<CandidateSessionData | null> {
  const existing = await getCandidateSession(sessionId);
  if (!existing) return null;

  const updated: CandidateSessionData = {
    ...existing,
    ...identity,
    verified: true,
  };
  await redis.set(
    sessionKey(sessionId),
    JSON.stringify(updated),
    "EX",
    SESSION_TTL_SECONDS,
  );
  return updated;
}

// ── 4. Called by /candidate-auth/complete/page.tsx — mints the one-time token ──
export async function hasBridgeTokenBeenIssued(
  sessionId: string,
): Promise<boolean> {
  const session = await getCandidateSession(sessionId);
  return !!session?.bridgeIssued;
}

export async function issueBridgeToken(
  sessionId: string,
): Promise<string | null> {
  const session = await getCandidateSession(sessionId);
  if (!session || session.bridgeIssued) {
    return null; // already issued once for this session — refuse a second one
  }

  const token = crypto.randomBytes(32).toString("hex");
  await redis.set(bridgeKey(token), sessionId, "EX", BRIDGE_TOKEN_TTL_SECONDS);

  // Mark the session as having already produced a token, so a refresh can't mint another.
  const updated = { ...session, bridgeIssued: true };
  await redis.set(
    sessionKey(sessionId),
    JSON.stringify(updated),
    "EX",
    SESSION_TTL_SECONDS,
  );

  return token;
}

// ── 5. Called by /api/widget — the ONLY place a bridge token is consumed ───

export async function verifyBridgeToken(
  token: string,
): Promise<CandidateSessionData | null> {
  const sessionId = await redis.getdel(bridgeKey(token));

  if (!sessionId) return null;
  const session = await getCandidateSession(sessionId);

  if (!session || !session.verified) return null;
  return session;
}
