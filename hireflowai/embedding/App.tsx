import { useEffect, useState } from "react";

const HIRE_FLOW_URL = "http://localhost:3000";

interface AppProps {
  widgetId: string;
}

export default function App({ widgetId }: AppProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Only accept messages from HireflowAI
      if (event.origin !== HIRE_FLOW_URL) {
        return;
      }

      if (event.data?.type === "HIRE_FLOW_CLOSE") {
        setOpen(false);
      }

      if (event.data?.type === "HIRE_FLOW_SUBMITTED") {
        setSubmitted(true);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  function closeModal() {
    setOpen(false);
    setSubmitted(false); // reset for next time the candidate opens it again
  }

  return (
    <>
      <button
        type="button"
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
            zIndex: 999999,
          }}
        >
          <div
            style={{
              width: "500px",
              height: "650px",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {submitted ? (
              // ── Success screen — rendered by App.tsx itself, on the company's page ──
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 32,
                  fontFamily: "system-ui",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    animation: "hireflow-pop 0.4s ease-out",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#16a34a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginBottom: 8 }}>
                  Application Submitted
                </h2>
                <p style={{ color: "#6b7280", margin: 0, maxWidth: 280, marginBottom: 24 }}>
                  Thanks for applying — the team will review your application and reach out if there's a match.
                </p>

                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 8,
                    border: "none",
                    background: "#000",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>

                <style>{`
                  @keyframes hireflow-pop {
                    0% { transform: scale(0); opacity: 0; }
                    70% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                  }
                `}</style>
              </div>
            ) : (
              <iframe
                title="HireflowAI Application Form"
                src={`${HIRE_FLOW_URL}/embeddingwidget/jobs?widgetId=${encodeURIComponent(widgetId)}&parentOrigin=${encodeURIComponent(window.location.origin)}`}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            )}

            {submitted && (
              <button
                type="button"
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  border: "none",
                  background: "transparent",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
