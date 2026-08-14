"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createHrUser } from "@/action/users";

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setMessage(null);

    const result = await createHrUser({ name, email, password });

    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    setLoading(false);

    if (result.success) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create HR Account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The HR will use these credentials to log into your company
            workspace.
          </p>
        </div>

        <div className="space-y-5">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && (
            <p
              className={
                message.type === "success"
                  ? "text-green-600 text-sm"
                  : "text-red-600 text-sm"
              }
            >
              {message.text}
            </p>
          )}

          <Button
            className="mx-auto flex px-8"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating…" : "Create HR"}
          </Button>
        </div>
      </div>
    </div>
  );
}
