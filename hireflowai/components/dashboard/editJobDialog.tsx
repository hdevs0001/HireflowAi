"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateJob } from "@/action/job";
import type { JobListItem } from "@/action/job";

interface Props {
  job: JobListItem;
  onClose: () => void;
  onSaved: (job: JobListItem) => void;
}

export function EditJobDialog({ job, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [evaluationPrompt, setEvaluationPrompt] = useState(job.evaluationPrompt ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setMessage(null);

    const result = await updateJob(job.id, { title, description, evaluationPrompt });

    if (!result.success) {
      setMessage(result.message);
      setLoading(false);
      return;
    }

    onSaved({ ...job, title, description, evaluationPrompt: evaluationPrompt || null });
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999999 }}
      className="flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold">Edit Job</h2>

        <div className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          <Textarea
            value={evaluationPrompt}
            onChange={(e) => setEvaluationPrompt(e.target.value)}
            placeholder="Custom AI evaluation prompt (leave blank to use company default)"
            rows={3}
          />

          {message && <p className="text-sm text-red-600">{message}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}