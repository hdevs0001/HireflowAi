import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
}

export default function StatsCard({
  title,
 value,
  icon: Icon,
  change,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          {change && (
            <p className="mt-1 text-xs text-green-600">{change}</p>
          )}
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className="h-7 w-7 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}