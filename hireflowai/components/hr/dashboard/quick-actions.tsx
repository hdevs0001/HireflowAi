import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        <Button>
          <Link href="/hr/candidate">View Candidates</Link>
        </Button>

        <Button variant="secondary">
          <Link href="/hr/interviews">Schedule Interview</Link>
        </Button>

        <Button variant="outline">
          <Link href="/hr/job">Create Job</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
