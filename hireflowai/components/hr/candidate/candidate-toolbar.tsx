"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "appliedDate-desc", label: "Newest first" },
  { value: "appliedDate-asc", label: "Oldest first" },
  { value: "aiScore-desc", label: "AI Score: High to Low" },
  { value: "aiScore-asc", label: "AI Score: Low to High" },
  { value: "statusUpdatedAt-asc", label: "Most stale first" },
];

export default function CandidateToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const currentSort = `${searchParams.get("sortBy") ?? "appliedDate"}-${
    searchParams.get("sortDir") ?? "desc"
  }`;

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.delete("page"); // reset pagination on any filter/sort change

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  // Debounce search only - sort applies immediately on select
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams({ search: search || null });
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handleSortChange(value: string | null) {
    if (!value) return;
    const [sortBy, sortDir] = value.split("-");
    updateParams({ sortBy, sortDir });
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        placeholder="Search candidate..."
        className="max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
