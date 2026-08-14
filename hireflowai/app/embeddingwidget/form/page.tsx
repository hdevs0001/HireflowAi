// app/embeddingwidget/form/page.tsx
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

const HIREFLOW_ORIGIN = process.env.NEXT_PUBLIC_HIREFLOW_ORIGIN!

export default function EmbeddedFormPage() {
  const searchParams = useSearchParams()
  const widgetId = searchParams.get("widgetId")
  const bridgeToken = searchParams.get("bridgeToken")
  const parentOrigin = searchParams.get("parentOrigin")

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!bridgeToken || !parentOrigin) {
      setError("Missing authentication. Please restart the application.")
      return
    }

    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append("parentOrigin", parentOrigin)

    try {
      const res = await fetch(`${HIREFLOW_ORIGIN}/api/widget`, {
        method: "POST",
        headers: { Authorization: `Bearer ${bridgeToken}` },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message ?? "Submission failed. Please try again.")
        return
      }

      setSubmitted(true)
      window.parent.postMessage({ type: "HIRE_FLOW_SUBMITTED", widgetId }, "*")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return <p style={{ padding: 24, fontFamily: "system-ui" }}>Application submitted. Thank you!</p>
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Application Details</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          required
          style={{ display: "block", width: "100%", padding: 10, marginBottom: 12, border: "1px solid #e5e7eb", borderRadius: 6, boxSizing: "border-box" }}
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          required
          style={{ display: "block", width: "100%", padding: 10, marginBottom: 12, border: "1px solid #e5e7eb", borderRadius: 6, boxSizing: "border-box" }}
        />
        <input
          name="resumeFile"
          type="file"
          accept="application/pdf,.pdf"
          required
          style={{ display: "block", width: "100%", marginBottom: 16 }}
        />

        {error && <p style={{ color: "#dc2626", marginBottom: 12 }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            border: "none",
            background: "#000",
            color: "#fff",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting…" : "Submit Application"}
        </button>
      </form>
    </div>
  )
}