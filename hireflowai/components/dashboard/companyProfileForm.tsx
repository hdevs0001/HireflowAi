"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCompanyProfile } from "@/action/settings";

interface Props {
  companyName: string;
  address: string;
  email: string;
}

export function CompanyProfileForm({ companyName, address, email }: Props) {
  const [name, setName] = useState(companyName);
  const [addr, setAddr] = useState(address);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    setMessage(null);
    const result = await updateCompanyProfile({ companyName: name, address: addr });
    setMessage({ type: result.success ? "success" : "error", text: result.message });
    setLoading(false);
  }

  return (
    <div className="max-w-lg space-y-5 rounded-xl border bg-card p-6">
      <div className="space-y-2">
        <Label>Company Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Input value={addr} onChange={(e) => setAddr(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={email} disabled />
        <p className="text-xs text-muted-foreground">
          Contact support to change your company email.
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