import { Progress } from "@/components/ui/progress";

interface Props {
  score: number;
}

export default function CandidateScore({
  score,
}: Props) {
  return (
    <div className="w-40 space-y-2">
      <Progress value={score} />

      <p className="text-xs text-muted-foreground">
        {score}%
      </p>
    </div>
  );
}