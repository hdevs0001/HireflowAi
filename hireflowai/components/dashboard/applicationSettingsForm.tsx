"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateApplicationSettings } from "@/action/settings";

interface Props {
  applicationCooldownDays: number;
  rejectionThreshold: number;
  recommendedThreshold: number;
}

export function ApplicationSettingsForm({
  applicationCooldownDays,
  rejectionThreshold,
  recommendedThreshold,
}: Props) {
  const [cooldown, setCooldown] = useState(applicationCooldownDays);
  const [rejectAt, setRejectAt] = useState(rejectionThreshold);
  const [recommendAt, setRecommendAt] = useState(recommendedThreshold);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setMessage(null);
    const result = await updateApplicationSettings({
      applicationCooldownDays: cooldown,
      rejectionThreshold: rejectAt,
      recommendedThreshold: recommendAt,
    });
    setMessage({ type: result.success ? "success" : "error", text: result.message });
    setLoading(false);
  }

  return (
    <div className="max-w-lg space-y-5 rounded-xl border bg-card p-6">
      <div className="space-y-2">
        <Label>Reapplication Cooldown (days)</Label>
        <Input
          type="number"
          value={cooldown}
          onChange={(e) => setCooldown(Number(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">
          How long a candidate must wait before reapplying to the same job.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Rejection Threshold</Label>
        <Input
          type="number"
          value={rejectAt}
          onChange={(e) => setRejectAt(Number(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">
          Resume scores below this are automatically marked Rejected.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Recommended Threshold</Label>
        <Input
          type="number"
          value={recommendAt}
          onChange={(e) => setRecommendAt(Number(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">
          Resume scores at or above this are automatically marked Recommended.
          Scores in between are left for manual review.
        </p>
      </div>

      {message && (
        <p className={message.type === "success" ? "text-sm text-green-600" : "text-sm text-red-600"}>
          {message.text}
        </p>
      )}

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}