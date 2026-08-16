"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { JobRow } from "@/lib/queries/jobs";

interface WidgetOption {
  id: string;
  widgetName: string | null;
}

interface Props {
  job?: JobRow;
  trigger?: React.ReactElement;
  widgets: WidgetOption[]; // NEW - all company widgets to choose from
}

export default function JobFormDialog({ job, trigger, widgets }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(job?.title ?? "");
  const [description, setDescription] = useState(job?.description ?? "");
  const [evaluationPrompt, setEvaluationPrompt] = useState(job?.evaluationPrompt ?? "");

  const [selectedWidgetIds, setSelectedWidgetIds] = useState<string[]>(
    job?.widgets?.map((w) => w.widgetId) ?? []
  );

  const isEdit = !!job;

  function toggleWidget(widgetId: string) {
    setSelectedWidgetIds((prev) =>
      prev.includes(widgetId) ? prev.filter((id) => id !== widgetId) : [...prev, widgetId]
    );
  }

  async function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    if (selectedWidgetIds.length === 0) {
      toast.error("Select at least one widget for this job");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(isEdit ? `/api/jobs/${job.id}` : "/api/jobs", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          evaluationPrompt: evaluationPrompt || undefined,
          widgetIds: selectedWidgetIds,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save job");
      }

      toast.success(isEdit ? "Job updated" : "Job created");
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
          trigger ?? (
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              Create Job
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Job" : "Create New Job"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1.5">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior React Developer" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="evaluationPrompt">AI Evaluation Prompt (optional)</Label>
            <Textarea id="evaluationPrompt" value={evaluationPrompt} onChange={(e) => setEvaluationPrompt(e.target.value)} rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Widgets (select at least one)</Label>
            {widgets.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No widgets found — create a widget first.
              </p>
            ) : (
              <div className="space-y-2 border rounded-lg p-3">
                {widgets.map((w) => (
                  <div key={w.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`widget-${w.id}`}
                      checked={selectedWidgetIds.includes(w.id)}
                      onCheckedChange={() => toggleWidget(w.id)}
                    />
                    <Label htmlFor={`widget-${w.id}`} className="font-normal cursor-pointer">
                      {w.widgetName ?? "Untitled Widget"}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Job"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}