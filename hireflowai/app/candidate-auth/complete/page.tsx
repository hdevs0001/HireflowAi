// app/candidate-auth/complete/page.tsx
import { auth } from "@/lib/auth.candidate";
import {
  getCandidateSession,
  markCandidateSessionVerified,
  issueBridgeToken,
} from "@/lib/candidate_session";
import { prisma } from "@/prisma";
import { CompleteClient } from "./complete-client";

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ widgetId?: string; sessionId?: string }>;
}) {
  const { widgetId, sessionId } = await searchParams;

  if (!widgetId || !sessionId) {
    return <p style={{ padding: 24 }}>Missing session information.</p>;
  }

  const session = await auth();
  if (!session?.candidate?.email) {
    return (
      <p style={{ padding: 24 }}>
        Authentication failed. You can close this window.
      </p>
    );
  }

  const redisSession = await getCandidateSession(sessionId);
  if (!redisSession) {
    return <p style={{ padding: 24 }}>Session expired. Please try again.</p>;
  }

  const { companyId } = redisSession;

  const candidate = await prisma.candidate.upsert({
    where: {
      companyId_email: {
        companyId,
        email: session.candidate.email,
      },
    },
    update: {
      googleSub: session.candidate.googleSub,
    },
    create: {
      companyId,
      email: session.candidate.email,
      googleSub: session.candidate.googleSub,
      name: session.candidate.name ?? null,
      image: session.candidate.image ?? null,
    },
  });

  const updated = await markCandidateSessionVerified(sessionId, {
    candidateId: candidate.id,
    googleSub: session.candidate.googleSub,
    email: session.candidate.email,
  });

  if (!updated) {
    return <p style={{ padding: 24 }}>Session expired. Please try again.</p>;
  }

  const bridgeToken = await issueBridgeToken(sessionId);
  if (!bridgeToken) {
    return (
      <p style={{ padding: 24 }}>
        This sign-in link has already been used. Please close this window and
        try again.
      </p>
    );
  }
  return (
    <CompleteClient
      widgetId={widgetId}
      bridgeToken={bridgeToken}
      candidateEmail={candidate.email!}
    />
  );
}
// 0ea59ef1-083a-4f3d-80a8-fe05f98a604d
