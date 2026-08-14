// app/embeddingwidget/auth/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const HIREFLOW_ORIGIN = process.env.NEXT_PUBLIC_HIREFLOW_ORIGIN!

export default function EmbeddedAuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const widgetId = searchParams.get("widgetId")
  const jobId = searchParams.get("jobId")
  const parentOrigin = searchParams.get("parentOrigin")

  const [sessionId, setSessionId] = useState<string | null>(null)
  const [candidateEmail, setCandidateEmail] = useState<string | null>(null)
  const [bridgeToken, setBridgeToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 1. Create the pre-auth session as soon as this page loads
  useEffect(() => {
    if (!widgetId || !jobId || !parentOrigin) {
      setError("Missing session information.")
      return
    }

    async function startSession() {
      const res = await fetch(`${HIREFLOW_ORIGIN}/api/widget/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widgetId, jobId, parentOrigin }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.message ?? "Could not start session.")
        return
      }
      setSessionId(data.sessionId)
    }

    startSession()
  }, [widgetId, jobId, parentOrigin])

  // 2. Listen for the popup's postMessage reply
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== HIREFLOW_ORIGIN) return
      if (event.data?.type !== "HIREFLOW_AUTH_SUCCESS") return
      if (event.data.widgetId !== widgetId) return

      setBridgeToken(event.data.bridgeToken)
      setCandidateEmail(event.data.candidateEmail)
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [widgetId])

  function continueWithGoogle() {
    if (!sessionId || !widgetId) return
    window.open(
      `${HIREFLOW_ORIGIN}/candidate-auth?widgetId=${encodeURIComponent(widgetId)}&sessionId=${encodeURIComponent(sessionId)}`,
      "hireflow-auth",
      "popup,width=480,height=640"
    )
  }

  function continueToForm() {
    if (!bridgeToken || !widgetId || !parentOrigin) return
    router.push(
      `/embeddingwidget/form?widgetId=${encodeURIComponent(widgetId)}&bridgeToken=${encodeURIComponent(bridgeToken)}&parentOrigin=${encodeURIComponent(parentOrigin)}`
    )
  }

  if (error) return <p style={{ padding: 24, fontFamily: "system-ui", color: "#dc2626" }}>{error}</p>

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400, margin: "0 auto" }}>
      {!candidateEmail ? (
        <>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Sign in to continue</h1>
          <p style={{ color: "#6b7280", marginBottom: 16 }}>
            Sign in with Google to continue your application.
          </p>
          <button
            type="button"
            onClick={continueWithGoogle}
            disabled={!sessionId}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: sessionId ? "pointer" : "not-allowed",
            }}
          >
            Continue with Google
          </button>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>You're signed in</h1>
          <p style={{ color: "#6b7280" }}>Signed in as</p>
          <p style={{ fontWeight: 600 }}>{candidateEmail}</p>
          <button
            type="button"
            onClick={continueToForm}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Continue to application
          </button>
        </>
      )}
    </div>
  )
}