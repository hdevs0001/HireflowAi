// app/candidate-auth/page.tsx
"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

export default function CandidateAuthPage() {
  const searchParams = useSearchParams()
  const widgetId = searchParams.get("widgetId")
  const sessionId = searchParams.get("sessionId")

  useEffect(() => {
    if (!widgetId || !sessionId) return

    signIn("google", {
      callbackUrl: `/candidate-auth/complete?widgetId=${encodeURIComponent(widgetId)}&sessionId=${encodeURIComponent(sessionId)}`,
    })
  }, [widgetId, sessionId])

  if (!widgetId || !sessionId) {
    return <p style={{ padding: 24 }}>Missing session information.</p>
  }

  return <p style={{ padding: 24 }}>Redirecting to Google…</p>
}