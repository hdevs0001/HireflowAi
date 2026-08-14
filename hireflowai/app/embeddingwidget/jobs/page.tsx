// app/embeddingwidget/jobs/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const HIREFLOW_ORIGIN = process.env.NEXT_PUBLIC_HIREFLOW_ORIGIN!

interface Job {
  id: string
  title: string
  description: string
}

export default function JobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const widgetId = searchParams.get("widgetId")
  const parentOrigin = searchParams.get("parentOrigin")

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!widgetId || !parentOrigin) {
      setError("Missing widget information.")
      setLoading(false)
      return
    }

    async function loadJobs() {
      try {
        const res = await fetch(
          `${HIREFLOW_ORIGIN}/api/widget/jobs?widgetId=${encodeURIComponent(widgetId!)}&parentOrigin=${encodeURIComponent(parentOrigin!)}`
        )
        const data = await res.json()
        if (!res.ok || !data.success) {
          setError(data.message ?? "Could not load jobs.")
          return
        }
        setJobs(data.jobs)
      } catch {
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [widgetId, parentOrigin])

  function selectJob(jobId: string) {
    router.push(
      `/embeddingwidget/auth?widgetId=${encodeURIComponent(widgetId!)}&jobId=${encodeURIComponent(jobId)}&parentOrigin=${encodeURIComponent(parentOrigin!)}`
    )
  }

  if (loading) return <p style={{ padding: 24, fontFamily: "system-ui" }}>Loading open roles…</p>
  if (error) return <p style={{ padding: 24, fontFamily: "system-ui", color: "#dc2626" }}>{error}</p>
  if (jobs.length === 0) return <p style={{ padding: 24, fontFamily: "system-ui" }}>No open roles right now.</p>

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Open Roles</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => selectJob(job.id)}
            style={{
              textAlign: "left",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 16,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <p style={{ fontWeight: 600, margin: 0 }}>{job.title}</p>
            <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4, marginBottom: 0 }}>
              {job.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}