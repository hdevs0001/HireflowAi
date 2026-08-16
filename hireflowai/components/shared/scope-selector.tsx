"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Widget {
  id: string;
  widgetName: string | null;
}

interface Job {
  id: string;
  title: string;
}

interface Props {
  widgets: Widget[];
  jobs: Job[];
}

export default function ScopeSelector({ widgets, jobs }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentWidget = searchParams.get("widget") ?? "";
  const currentJob = searchParams.get("job") ?? "";

  function updateScope(updates: { widget?: string | null; job?: string | null }) {
    const params = new URLSearchParams(searchParams.toString());

    if ("widget" in updates) {
      updates.widget ? params.set("widget", updates.widget) : params.delete("widget");
      params.delete("job");
    }

    if ("job" in updates) {
      updates.job ? params.set("job", updates.job) : params.delete("job");
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3">
      <Select
        value={currentWidget || "all"}
        onValueChange={(v) => updateScope({ widget: v === "all" ? null : v })}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="All Widgets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Widgets</SelectItem>
          {widgets.map((w) => (
            <SelectItem key={w.id} value={w.id}>
              {w.widgetName ?? "Untitled Widget"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentJob || "all"}
        onValueChange={(v) => updateScope({ job: v === "all" ? null : v })}
        disabled={!currentWidget}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={currentWidget ? "All Jobs" : "Select a widget first"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Jobs</SelectItem>
          {jobs.map((j) => (
            <SelectItem key={j.id} value={j.id}>
              {j.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}