// app/candidate-auth/layout.tsx
import { SessionProvider } from "next-auth/react"

export default function CandidateAuthLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider basePath="/api/candidate-auth">{children}</SessionProvider>
}