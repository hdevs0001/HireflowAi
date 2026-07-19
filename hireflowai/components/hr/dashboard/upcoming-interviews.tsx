import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const upcoming = [
  "Tomorrow - React Developer",
  "Tomorrow - NodeJS Developer",
  "Friday - Product Designer",
];

export default function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {upcoming.map((item) => (
          <div
            key={item}
            className="rounded-lg border p-3"
          >
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}     