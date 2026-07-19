"use client";

import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  accepted: number;
  rejected: number;
  interviewing: number;
}

export function CandidateChart({
  accepted,
  rejected,
  interviewing,
}: Props) {
  const data = [
    {
      status: "Accepted",
      total: accepted,
    },
    {
      status: "Rejected",
      total: rejected,
    },
    {
      status: "Interviewing",
      total: interviewing,
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Candidate Status
        </h2>

        <ChartContainer
          config={{
            total: {
              label: "Candidates",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[350px] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="status" />

            <ChartTooltip
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="total"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}