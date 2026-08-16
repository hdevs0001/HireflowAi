"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toggleJobActive } from "@/action/job";
import type { JobListItem } from "@/action/job";
import { EditJobDialog } from "@/components/dashboard/editJobDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  jobs: JobListItem[];
}

export function JobsTable({ jobs: initialJobs }: Props) {
  const [jobs, setJobs] = useState(initialJobs);
  const [editingJob, setEditingJob] = useState<JobListItem | null>(null);

  async function handleToggle(jobId: string, active: boolean) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isActive: active } : j)),
    );
    const result = await toggleJobActive(jobId, active);
    if (!result.success) {
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, isActive: !active } : j)),
      );
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border py-16 text-center">
        <p className="font-medium">No jobs created yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a job posting to start receiving applications through your
          widget.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Custom Prompt</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.applicationCount}</TableCell>
                <TableCell>
                  {job.evaluationPrompt ? (
                    <span className="text-green-600 text-sm">Custom</span>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Using default
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={job.isActive}
                    onCheckedChange={(value) => handleToggle(job.id, value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingJob(job)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingJob && (
        <EditJobDialog
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSaved={(updated) => {
            setJobs((prev) =>
              prev.map((j) => (j.id === updated.id ? { ...j, ...updated } : j)),
            );
            setEditingJob(null);
          }}
        />
      )}
    </>
  );
}
