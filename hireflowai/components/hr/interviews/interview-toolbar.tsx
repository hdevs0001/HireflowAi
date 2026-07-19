"use client";

import { Input } from "@/components/ui/input";

export default function InterviewToolbar() {
  return (
    <div className="flex justify-between">
      <Input
        className="max-w-sm"
        placeholder="Search interview..."
      />
    </div>
  );
}