import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function HrNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
      <h1 className="text-xl font-semibold mb-2">Not found</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        The candidate, job, or widget you're looking for doesn't exist, or you
        don't have access to it.
      </p>
      <Button>
        <Link href="/hr/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
