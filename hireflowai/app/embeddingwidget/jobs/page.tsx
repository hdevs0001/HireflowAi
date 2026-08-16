// // app/embeddingwidget/jobs/page.tsx
// "use client"

// import { useEffect, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"

// const HIREFLOW_ORIGIN = process.env.NEXT_PUBLIC_HIREFLOW_ORIGIN!

// interface Job {
//   id: string
//   title: string
//   description: string
// }

// export default function JobsPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const widgetId = searchParams.get("widgetId")
//   const parentOrigin = searchParams.get("parentOrigin")

//   const [jobs, setJobs] = useState<Job[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (!widgetId || !parentOrigin) {
//       setError("Missing widget information.")
//       setLoading(false)
//       return
//     }

//     async function loadJobs() {
//       try {
//         const res = await fetch(
//           `${HIREFLOW_ORIGIN}/api/widget/jobs?widgetId=${encodeURIComponent(widgetId!)}&parentOrigin=${encodeURIComponent(parentOrigin!)}`
//         )
//         const data = await res.json()
//         if (!res.ok || !data.success) {
//           setError(data.message ?? "Could not load jobs.")
//           return
//         }
//         setJobs(data.jobs)
//       } catch {
//         setError("Something went wrong. Please try again.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadJobs()
//   }, [widgetId, parentOrigin])

//   function selectJob(jobId: string) {
//     router.push(
//       `/embeddingwidget/auth?widgetId=${encodeURIComponent(widgetId!)}&jobId=${encodeURIComponent(jobId)}&parentOrigin=${encodeURIComponent(parentOrigin!)}`
//     )
//   }

//   if (loading) return <p style={{ padding: 24, fontFamily: "system-ui" }}>Loading open roles…</p>
//   if (error) return <p style={{ padding: 24, fontFamily: "system-ui", color: "#dc2626" }}>{error}</p>
//   if (jobs.length === 0) return <p style={{ padding: 24, fontFamily: "system-ui" }}>No open roles right now.</p>

//   return (
//     <div style={{ padding: 24, fontFamily: "system-ui" }}>
//       <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Open Roles</h1>
//       <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//         {jobs.map((job) => (
//           <button
//             key={job.id}
//             onClick={() => selectJob(job.id)}
//             style={{
//               textAlign: "left",
//               border: "1px solid #e5e7eb",
//               borderRadius: 8,
//               padding: 16,
//               background: "#fff",
//               cursor: "pointer",
//             }}
//           >
//             <p style={{ fontWeight: 600, margin: 0 }}>{job.title}</p>
//             <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4, marginBottom: 0 }}>
//               {job.description}
//             </p>
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }
// app/embeddingwidget/jobs/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Inbox } from "lucide-react"

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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

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

  function toggleExpanded(jobId: string) {
    setExpanded((prev) => ({ ...prev, [jobId]: !prev[jobId] }))
  }

  return (
    <div className="mx-auto max-w-2xl p-6 font-sans">
      <h1 className="mb-5 text-xl font-bold text-foreground">Open Roles</h1>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          <Inbox className="h-8 w-8" />
          <p className="text-sm">No open roles right now.</p>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job) => {
            const isExpanded = !!expanded[job.id]

            return (
              <Card key={job.id}>
                <CardHeader>
                  <h2 className="text-base font-semibold text-foreground">{job.title}</h2>
                </CardHeader>

                <CardContent>
                  <p
                    className={`text-sm text-muted-foreground ${
                      isExpanded ? "" : "line-clamp-2"
                    }`}
                  >
                    {job.description}
                  </p>

                  {job.description.length > 100 && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(job.id)}
                      className="mt-1 text-sm font-medium text-primary hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </CardContent>

                <CardFooter>
                  <Button onClick={() => selectJob(job.id)} className="w-full sm:w-auto cursor-pointer">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}