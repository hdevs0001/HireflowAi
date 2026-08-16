"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  counts: { today: number; upcoming: number; needsFeedback: number };
}

export default function InterviewToolbar({ counts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const currentView = searchParams.get("view") ?? "all";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        value ? params.set(key, value) : params.delete(key);
      });
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const timeout = setTimeout(() => updateParams({ search: search || null }), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <Tabs value={currentView} onValueChange={(v) => updateParams({ view: v === "all" ? null : v })}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today ({counts.today})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({counts.upcoming})</TabsTrigger>
          <TabsTrigger value="needs-feedback">
            Needs Feedback ({counts.needsFeedback})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Input
        className="max-w-sm"
        placeholder="Search interview..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}