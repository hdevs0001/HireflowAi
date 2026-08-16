import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">This page doesn't exist.</p>
      <Button >
        <Link href="/hr/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}