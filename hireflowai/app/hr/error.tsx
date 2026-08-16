"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function HrError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, wire this to your error tracking (Sentry, etc.) instead of console
    console.error("HR dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        An unexpected error occurred while loading this page. Try again, or
        contact support if it keeps happening.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
