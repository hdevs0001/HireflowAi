"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

const MAX_SIZE_MB = 1;

interface WidgetApiResponse {
  success: boolean;
  message: string;
}

export default function WidgetForm() {
  const searchParams = useSearchParams();

  const widgetId = searchParams.get("widgetId");

  const [loading, setLoading] = useState(false);

  function validateResume(file: File | null): string | null {
    if (!file) {
      return "Please attach the resume";
    }

    const isPdfMime = file.type === "application/pdf";

    const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdfMime || !isPdfExtension) {
      return "Resume must be a PDF file";
    }

    const sizeMB = file.size / (1024 * 1024);

    if (sizeMB > MAX_SIZE_MB) {
      return `File must be under ${MAX_SIZE_MB}MB.`;
    }

    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!widgetId) {
      alert("Invalid widget");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const resume = formData.get("resumeFile") as File | null;

    const error = validateResume(resume);

    if (error) {
      alert(error);
      return;
    }
    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : null;
    formData.append("widgetId", widgetId);
    formData.append("porigin", parentOrigin ?? "");
    try {
      setLoading(true);

      const res = await fetch("/api/widget", {
        method: "POST",
        body: formData,
      });

      const data: WidgetApiResponse = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      // Tell parent website
      window.parent.postMessage(
        {
          type: "HIRE_FLOW_SUBMITTED",
        },
        "*",
      );
    } catch (error) {
      console.error(error);

      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function closeWidget() {
    window.parent.postMessage(
      {
        type: "HIRE_FLOW_CLOSE",
      },
      "*",
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <button
          type="button"
          onClick={closeWidget}
          style={{
            float: "right",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "black",
          }}
        >
          Apply
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        />

        <input
          name="phoneNumber"
          required
          placeholder="Phone Number"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        />

        <input
          name="resumeFile"
          required
          type="file"
          accept="application/pdf,.pdf"
          style={{
            width: "100%",
            marginBottom: "20px",
            color: "black",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
