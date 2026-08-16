import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CandidateRow } from "@/lib/queries/candidates";

interface Props {
  application: CandidateRow;
}

export default function CandidateProfileHeader({ application }: Props) {
  const { candidate } = application;
  const resumeUrl = application.resumePublicUrl ?? application.resumeUrl;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-lg">
            {(candidate.name ?? "??").slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-xl font-semibold">{candidate.name ?? "Unknown"}</h1>
          <p className="text-sm text-muted-foreground">
            {candidate.email}
            {candidate.phone && ` · ${candidate.phone}`}
          </p>
        </div>
      </div>

      {resumeUrl && (
        <Button variant="outline" >
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </Button>
      )}
    </div>
  );
}