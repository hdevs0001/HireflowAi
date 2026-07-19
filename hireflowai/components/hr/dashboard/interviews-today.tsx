import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const interviews = [
  {
    name: "John Smith",
    role: "Frontend Developer",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    name: "Emma Watson",
    role: "Backend Developer",
    time: "12:30 PM",
    status: "Live",
  },
  {
    name: "Michael Lee",
    role: "Designer",
    time: "3:00 PM",
    status: "Pending",
  },
];

export default function InterviewsToday() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Interviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {interviews.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>
                  {item.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.role}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p>{item.time}</p>
              <Badge>{item.status}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}