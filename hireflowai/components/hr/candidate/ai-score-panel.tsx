import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AIEvaluation } from "@prisma/client";

interface Props {
  evaluation: AIEvaluation | null;
}

const SUB_SCORES: { key: keyof AIEvaluation; label: string }[] = [
  { key: "skillsMatch", label: "Skills Match" },
  { key: "experienceMatch", label: "Experience Match" },
  { key: "educationMatch", label: "Education Match" },
  { key: "projectMatch", label: "Project Match" },
  { key: "jobRelevance", label: "Job Relevance" },
];

const RECOMMENDATION_STYLES: Record<string, string> = {
  RECOMMEND: "bg-green-500 hover:bg-green-500",
  REVIEW: "bg-amber-500 hover:bg-amber-500",
  REJECT: "bg-red-500 hover:bg-red-500",
};

export default function AIScorePanel({ evaluation }: Props) {
  if (!evaluation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            AI evaluation hasn't run yet for this application.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Evaluation</CardTitle>
        <Badge className={RECOMMENDATION_STYLES[evaluation.recommendation]}>
          {evaluation.recommendation}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold">{evaluation.aiScore}</span>
            <span className="text-sm text-muted-foreground">Overall Score</span>
          </div>
        </div>

        <div className="space-y-3">
          {SUB_SCORES.map(({ key, label }) => (
            <div key={key}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{label}</span>
                <span>{evaluation[key] as number}%</span>
              </div>
              <Progress value={evaluation[key] as number} />
            </div>
          ))}
        </div>

        {evaluation.matchedSkills.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Matched Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {evaluation.matchedSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {evaluation.missingSkills.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Missing Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {evaluation.missingSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-red-600 border-red-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground mb-1">AI Reasoning</p>
          <p className="text-sm">{evaluation.reason}</p>
        </div>
      </CardContent>
    </Card>
  );
}