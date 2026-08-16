"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { InterviewRound } from "@prisma/client";

interface Props {
  applicationId: string;
}

const ROUND_LABELS: Record<InterviewRound, string> = {
  PHONE_SCREEN: "Phone Screen",
  TECHNICAL: "Technical",
  HR_ROUND: "HR Round",
  FINAL: "Final",
  OTHER: "Other",
};

export default function ScheduleInterviewDialog({ applicationId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [round, setRound] = useState<InterviewRound>("PHONE_SCREEN");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewerName, setInterviewerName] = useState("");

async function handleSubmit() {
  if (!interviewTime) {
    toast.error("Pick an interview time");
    return;
  }

  setLoading(true);

  try {
    // Convert the naive datetime-local string into a real Date using the
    // browser's local timezone, then serialize to a proper ISO string.
    // This avoids the server guessing/misinterpreting the timezone.
    const localDate = new Date(interviewTime);
    const isoTimestamp = localDate.toISOString();

    const res = await fetch("/api/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId,
        round,
        interviewTime: isoTimestamp,
        interviewerName: interviewerName || undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? "Failed to schedule interview");
    }

    toast.success("Interview scheduled — invite email queued");
    setOpen(false);
    router.refresh();
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Round</Label>
            <Select value={round} onValueChange={(v) => setRound(v as InterviewRound)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROUND_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="time">Interview Time</Label>
            <Input
              id="time"
              type="datetime-local"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="interviewer">Interviewer (optional)</Label>
            <Input
              id="interviewer"
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              placeholder="e.g. Priya Sharma"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            Schedule & Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}