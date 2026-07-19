import { Card, CardContent } from "@/components/ui/card";

interface Props {
  totalCandidates: number;
  accepted: number;
  rejected: number;
  interviewing: number;
}

export function AnalyticsCards({
  totalCandidates,
  accepted,
  rejected,
  interviewing,
}: Props) {
  const cards = [
    {
      title: "Total Candidates",
      value: totalCandidates,
    },
    {
      title: "Accepted",
      value: accepted,
    },
    {
      title: "Rejected",
      value: rejected,
    },
    {
      title: "Interviewing",
      value: interviewing,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="space-y-2 p-6">
            <p className="text-sm text-muted-foreground">
              {card.title}
            </p>

            <h2 className="text-4xl font-bold">
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}