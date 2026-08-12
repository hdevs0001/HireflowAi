// app/candidate-auth/complete/complete-client.tsx
"use client"

import { useEffect } from "react"

export function CompleteClient({
  widgetId,
  bridgeToken,
  candidateEmail,
}: {
  widgetId: string
  bridgeToken: string
  candidateEmail: string
}) {
  useEffect(() => {
    window.opener?.postMessage(
      { type: "HIREFLOW_AUTH_SUCCESS", widgetId, bridgeToken, candidateEmail },
      window.location.origin
    )
    window.close()
  }, [widgetId, bridgeToken, candidateEmail])

  return <p style={{ padding: 24 }}>Signed in — you can close this window.</p>
}