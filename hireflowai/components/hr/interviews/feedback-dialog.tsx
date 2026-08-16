"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, MessageSquareText } from "lucide-react";
import { toast } from "sonner";

interface Props {
  interviewId: string;
}

export default function FeedbackDialog({ interviewId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");
  const [outcome, setOutcome] = useState<"PASS" | "FAIL" | null>(null);

  async function handleSubmit() {
    if (!outcome) {
      toast.error("Select an outcome");
      return;
    }
    if (!feedback.trim()) {
      toast.error("Feedback notes are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/interviews/${interviewId}/feedback`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback,
          feedbackScore: score ? parseInt(score) : undefined,
          outcome,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit feedback");
      }

      toast.success("Feedback submitted");
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
            <MessageSquareText className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Interview Feedback</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={outcome === "PASS" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setOutcome("PASS")}
            >
              Pass
            </Button>
            <Button
              type="button"
              variant={outcome === "FAIL" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setOutcome("FAIL")}
            >
              Fail
            </Button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="score">Score (0-100, optional)</Label>
            <Input
              id="score"
              type="number"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="feedback">Notes</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="How did the candidate perform?"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}