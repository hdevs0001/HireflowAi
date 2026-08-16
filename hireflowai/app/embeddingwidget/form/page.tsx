// // app/embeddingwidget/form/page.tsx
// "use client"

// import { useState } from "react"
// import { useSearchParams } from "next/navigation"

// const HIREFLOW_ORIGIN = process.env.NEXT_PUBLIC_HIREFLOW_ORIGIN!

// export default function EmbeddedFormPage() {
//   const searchParams = useSearchParams()
//   const widgetId = searchParams.get("widgetId")
//   const bridgeToken = searchParams.get("bridgeToken")
//   const parentOrigin = searchParams.get("parentOrigin")

//   const [submitting, setSubmitting] = useState(false)
//   const [submitted, setSubmitted] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setError(null)

//     if (!bridgeToken || !parentOrigin) {
//       setError("Missing authentication. Please restart the application.")
//       return
//     }

//     setSubmitting(true)
//     const formData = new FormData(e.currentTarget)
//     formData.append("parentOrigin", parentOrigin)

//     try {
//       const res = await fetch(`${HIREFLOW_ORIGIN}/api/widget`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${bridgeToken}` },
//         body: formData,
//       })

//       const data = await res.json()

//       if (!res.ok || !data.success) {
//         setError(data.message ?? "Submission failed. Please try again.")
//         return
//       }

//       setSubmitted(true)
//       window.parent.postMessage({ type: "HIRE_FLOW_SUBMITTED", widgetId }, "*")
//     } catch {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (submitted) {
//     return <p style={{ padding: 24, fontFamily: "system-ui" }}>Application submitted. Thank you!</p>
//   }

//   return (
//     <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 400, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Application Details</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="fullName"
//           placeholder="Full Name"
//           required
//           style={{ display: "block", width: "100%", padding: 10, marginBottom: 12, border: "1px solid #e5e7eb", borderRadius: 6, boxSizing: "border-box" }}
//         />
//         <input
//           name="phoneNumber"
//           placeholder="Phone Number"
//           required
//           style={{ display: "block", width: "100%", padding: 10, marginBottom: 12, border: "1px solid #e5e7eb", borderRadius: 6, boxSizing: "border-box" }}
//         />
//         <input
//           name="resumeFile"
//           type="file"
//           accept="application/pdf,.pdf"
//           required
//           style={{ display: "block", width: "100%", marginBottom: 16 }}
//         />

//         {error && <p style={{ color: "#dc2626", marginBottom: 12 }}>{error}</p>}

//         <button
//           type="submit"
//           disabled={submitting}
//           style={{
//             width: "100%",
//             padding: "12px",
//             borderRadius: 8,
//             border: "none",
//             background: "#000",
//             color: "#fff",
//             cursor: submitting ? "not-allowed" : "pointer",
//           }}
//         >
//           {submitting ? "Submitting…" : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   )
// }

// app/embeddingwidget/form/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2, FileText, CheckCircle2, Upload } from "lucide-react";

const HIREFLOW_ORIGIN = process.env.NEXT_PUBLIC_HIREFLOW_ORIGIN!;

export default function EmbeddedFormPage() {
  const searchParams = useSearchParams();

  const widgetId = searchParams.get("widgetId");
  const bridgeToken = searchParams.get("bridgeToken");
  const parentOrigin = searchParams.get("parentOrigin");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setResumeFile(null);
      return;
    }

    // Client-side validation for better UX.
    // Server-side validation is still required.
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please select a PDF file.");
      e.target.value = "";
      setResumeFile(null);
      return;
    }

    setError(null);
    setResumeFile(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!bridgeToken || !parentOrigin) {
      setError("Missing authentication. Please restart the application.");
      return;
    }

    if (!resumeFile) {
      setError("Please upload your resume.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Keep parentOrigin as part of the form payload.
    formData.set("parentOrigin", parentOrigin);

    try {
      const res = await fetch(`${HIREFLOW_ORIGIN}/api/widget`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bridgeToken}`,
        },
        body: formData,
      });

      let data: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok || !data.success) {
        setError(data.message ?? "Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);

      // Notify only the expected parent origin.
      window.parent.postMessage(
        {
          type: "HIRE_FLOW_SUBMITTED",
          widgetId,
        },
        parentOrigin,
      );
    } catch {
      setError(
        "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6">
        <div className="mx-auto flex min-h-[500px] max-w-md items-center justify-center">
          <Card className="w-full shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-12 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h2 className="text-xl font-semibold tracking-tight">
                Application submitted
              </h2>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thank you for applying. Your application has been received
                successfully.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-xl">
        <Card className="overflow-hidden border shadow-sm bg-transparent">
          <CardHeader className="space-y-2 border-b bg-transparent">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Apply for this position
            </CardTitle>

            <CardDescription>
              Complete the form below to submit your application.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 bg-transparent">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">Personal Information</h3>

                <p className="text-sm text-muted-foreground">
                  Tell us a little about yourself.
                </p>
              </div>

              <div className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>

                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    disabled={submitting}
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>

                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <Separator />

              {/* Resume */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Resume</h3>

                  <p className="text-sm text-muted-foreground">
                    Upload your latest resume in PDF format.
                  </p>
                </div>

                <div
                  className={`rounded-lg border border-dashed p-6 transition-colors ${
                    resumeFile
                      ? "border-primary/40 bg-primary/5"
                      : "bg-muted/30"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-sm">
                      {resumeFile ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {resumeFile ? (
                      <>
                        <p className="max-w-full truncate px-4 text-sm font-medium">
                          {resumeFile.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        <Label
                          htmlFor="resumeFile"
                          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Upload className="h-4 w-4" />
                          Change PDF
                        </Label>
                      </>
                    ) : (
                      <>
                        <p className="mb-1 text-sm font-medium">
                          Upload your resume
                        </p>

                        <p className="mb-4 text-xs text-muted-foreground">
                          PDF files only
                        </p>

                        <Label
                          htmlFor="resumeFile"
                          className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Upload className="h-4 w-4" />
                          Choose PDF
                        </Label>
                      </>
                    )}

                    <Input
                      id="resumeFile"
                      name="resumeFile"
                      type="file"
                      accept="application/pdf,.pdf"
                      required
                      disabled={submitting}
                      className="sr-only"
                      onChange={handleResumeChange}
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By submitting this application, you confirm that the information
                provided is accurate.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
