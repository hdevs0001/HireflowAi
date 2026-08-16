"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateDefaultPrompt } from "@/action/settings";

interface Props {
  aiDefaultPrompt: string;
}

export function DefaultPromptForm({ aiDefaultPrompt }: Props) {
  const [prompt, setPrompt] = useState(aiDefaultPrompt);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setMessage(null);
    const result = await updateDefaultPrompt(prompt);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    setLoading(false);
  }

  return (
    <div className="max-w-lg space-y-5 rounded-xl border bg-card p-6">
      <div className="space-y-2">
        <Label>Default AI Evaluation Prompt</Label>
        <Textarea
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Evaluate this resume for overall fit, weighing relevant experience and skills over education."
        />
        <p className="text-xs text-muted-foreground">
          Used when a job has no custom evaluation prompt of its own. You can
          override this per job on the Jobs page.
        </p>
      </div>

      {message && (
        <p
          className={
            message.type === "success"
              ? "text-sm text-green-600"
              : "text-sm text-red-600"
          }
        >
          {message.text}
        </p>
      )}

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving…" : "Save Prompt"}
      </Button>
    </div>
  );
}
