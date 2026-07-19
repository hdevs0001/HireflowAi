import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        <Button>View Candidates</Button>
        <Button variant="secondary">Schedule Interview</Button>
        <Button variant="outline">Create Job</Button>
      </CardContent>
    </Card>
  );
}