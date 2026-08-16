"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CandidateStatusEnum } from "@prisma/client";
import { ALLOWED_TRANSITIONS, STATUS_LABELS, isTerminal } from "@/lib/utils/status-machine";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  applicationId: string;
  currentStatus: CandidateStatusEnum;
}

export default function StatusChangeMenu({ applicationId, currentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nextOptions = ALLOWED_TRANSITIONS[currentStatus];

  if (isTerminal(currentStatus) || nextOptions.length === 0) {
    return (
      <span className="text-sm text-muted-foreground">
        {STATUS_LABELS[currentStatus]}
      </span>
    );
  }

  async function handleChange(newStatus: CandidateStatusEnum) {
    setLoading(true);

    try {
      const res = await fetch(`/api/candidates/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to update status");
      }

      toast.success(`Moved to ${STATUS_LABELS[newStatus]}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" disabled={loading}>
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                {STATUS_LABELS[currentStatus]}
                <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </>
            )}
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        {nextOptions.map((status) => (
          <DropdownMenuItem key={status} onClick={() => handleChange(status)}>
            Move to {STATUS_LABELS[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}