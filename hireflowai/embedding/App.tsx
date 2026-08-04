"use client";
import { useEffect, useState, useRef } from "react";
import Script from "next/script";
interface WidgetApiResponse {
  success: boolean;
  message: string;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const MAX_SIZE_MB = 1;
  const [turnstileReady, setTurnstileReady] = useState(false);
  const widgetIdRef = useRef<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState("");
  useEffect(() => {
    if (!open || !turnstileReady) return;
    if (!turnstileRef.current) return;

    // Don't render twice
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: "0x4AAAAAAD-5OqClLGgJyKAi",

      callback(token: string) {
        setTurnstileToken(token);
      },
    });
  }, [open, turnstileReady]);
  useEffect(() => {
    if (open) return;

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      setTurnstileToken("");
    }
  }, [open]);

  function ValidateResume(file: File | null): string | null {
    if (!file) return "Please attach the resume";
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const resume = formData.get("resumeFile") as File | null;
    const error = ValidateResume(resume);
    if (error) {
      alert(error);
      return;
    }
    if (!turnstileToken) {
      alert("Please complete the Turnstile verification.");
      return;
    }
    const script = document.querySelector<HTMLScriptElement>(
      'script[src="http://localhost:3000/widget.js"]',
    );

    const widgetId: string | undefined = script?.dataset.widgetId;

    if (!widgetId) {
      alert("Wrong WidgetID");
      return;
    }
    formData.append("widgetId", widgetId);
    formData.append("turnstileToken", turnstileToken);
    const res = await fetch("http://localhost:3000/api/widget", {
      method: "POST",
      body: formData,
    });

    const data: WidgetApiResponse = await res.json();

    if (!res.ok) {
      alert(data.message);
      setOpen(false);
      return;
    }

    alert(data.message);
    setOpen(false);
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setTurnstileReady(true)}
      />

      <button
        onClick={() => setOpen(true)}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "14px 22px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Apply Now
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              width: "420px",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,.2)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                right: "15px",
                top: "15px",
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
            <div ref={turnstileRef}></div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
