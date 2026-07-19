import { CandidateTable } from "@/components/dashboard/candidateTable";
import { getAllCandidates } from "@/action/candidate";

export default async function CandidatePage() {
  const candidates = await getAllCandidates();

  return (
    <main className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">
          Candidates
        </h1>

        <p className="text-muted-foreground">
          Manage all candidate applications.
        </p>
      </div>

      <CandidateTable candidates={candidates} />
    </main>
  );
}