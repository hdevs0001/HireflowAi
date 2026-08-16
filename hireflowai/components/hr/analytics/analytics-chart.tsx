"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrendPoint {
  month: string;
  accepted: number;
  interviewing: number;
  rejected: number;
}

interface Props {
  data: TrendPoint[];
}

export default function AnalyticsChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Trend</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="accepted" name="Accepted" radius={[4, 4, 0, 0]} />
            <Bar dataKey="interviewing" name="Interviewing" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rejected" name="Rejected" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}