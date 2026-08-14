"use client";

import { useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import type { HRUser } from "@/action/users";
import { toggleHrStatus } from "@/action/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  users: HRUser[];
}

export function UsersTable({ users: initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  function handleToggle(userId: string, nextValue: boolean) {
    // Optimistically reflect the switch position immediately for feel,
    // but the ACTUAL server call is delayed by the debounce below.
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, active: nextValue } : u))
    );
    setPendingIds((prev) => new Set(prev).add(userId));

    // Clear any previous pending timer for this user — rapid re-clicking
    // just keeps resetting the 4s window instead of firing multiple requests.
    if (timers.current[userId]) {
      clearTimeout(timers.current[userId]);
    }

    timers.current[userId] = setTimeout(async () => {
      const result = await toggleHrStatus(userId, nextValue);

      if (!result.success) {
        // Revert on failure — server said no, so undo the optimistic flip.
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, active: !nextValue } : u))
        );
      }

      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });

      delete timers.current[userId];
    }, 4000);
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border py-16 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-muted-foreground"
          >
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-medium">No HR created yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          HR accounts you create will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Enable / Disable</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name ?? "—"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.active ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Disabled</span>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={user.active}
                  onCheckedChange={(value) => handleToggle(user.id, value)}
                  className={pendingIds.has(user.id) ? "opacity-50" : ""}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}