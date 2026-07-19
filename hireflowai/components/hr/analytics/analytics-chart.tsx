"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    month: "Jan",
    accepted: 18,
    interviewing: 35,
    rejected: 42,
  },
  {
    month: "Feb",
    accepted: 26,
    interviewing: 41,
    rejected: 38,
  },
  {
    month: "Mar",
    accepted: 32,
    interviewing: 28,
    rejected: 51,
  },
  {
    month: "Apr",
    accepted: 40,
    interviewing: 37,
    rejected: 33,
  },
  {
    month: "May",
    accepted: 45,
    interviewing: 31,
    rejected: 29,
  },
  {
    month: "Jun",
    accepted: 52,
    interviewing: 25,
    rejected: 21,
  },
];

export default function AnalyticsChart() {
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

            <Bar
              dataKey="accepted"
              name="Accepted"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="interviewing"
              name="Interviewing"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="rejected"
              name="Rejected"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}