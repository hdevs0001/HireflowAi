import { getAllJobs } from "@/action/job";
import { JobsTable } from "@/components/dashboard/jobsTable";
import { CreateJobForm } from "@/components/dashboard/createJobForm";

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage job postings and their AI evaluation prompts.
        </p>
      </div>

      <CreateJobForm />
      <JobsTable jobs={jobs} />
    </div>
  );
}
