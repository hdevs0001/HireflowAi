"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/action/job";

export function CreateJobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [evaluationPrompt, setEvaluationPrompt] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setMessage(null);

    const result = await createJob({ title, description, evaluationPrompt });

    setMessage({ type: result.success ? "success" : "error", text: result.message });
    setLoading(false);

    if (result.success) {
      setTitle("");
      setDescription("");
      setEvaluationPrompt("");
      setExpanded(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 font-semibold">Create New Job</h2>

      <div className="space-y-3">
        <Input placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm text-blue-600 hover:underline"
          >
            {expanded ? "Hide" : "Add"} custom AI evaluation prompt (optional)
          </button>

          {expanded && (
            <Textarea
              className="mt-2"
              placeholder="e.g. Prioritize candidates with 3+ years of backend experience and strong system design skills. Be strict about missing required skills."
              value={evaluationPrompt}
              onChange={(e) => setEvaluationPrompt(e.target.value)}
              rows={3}
            />
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            Leave blank to use your company's default prompt from Settings.
          </p>
        </div>

        {message && (
          <p className={message.type === "success" ? "text-sm text-green-600" : "text-sm text-red-600"}>
            {message.text}
          </p>
        )}

        <Button onClick={handleSubmit} disabled={loading || !title || !description}>
          {loading ? "Creating…" : "Create Job"}
        </Button>
      </div>
    </div>
  );
}