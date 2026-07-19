import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activity = [
  "Rahul applied for React Developer",
  "Interview scheduled with Emma",
  "AI finished processing 22 resumes",
  "Offer letter sent to Michael",
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {activity.map((item) => (
          <div
            key={item}
            className="border-l-2 pl-4 text-sm"
          >
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}