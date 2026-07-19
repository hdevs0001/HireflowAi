"use client";

import { Input } from "@/components/ui/input";

export default function CandidateToolbar() {
  return (
    <div className="flex items-center justify-between">

      <Input
        placeholder="Search candidate..."
        className="max-w-sm"
      />

    </div>
  );
}