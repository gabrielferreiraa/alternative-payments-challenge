"use client";

import { memo } from "react";

import { Pie, PieChart } from "recharts";

import { CustomLegend } from "@/components/molecules/custom-legend";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCharacterLocationChart } from "@/hooks/use-character-location-chart";
import type { Character } from "@/types";

type CharacterLocationChartProps = {
  characters?: Character[] | null;
};

export const CharacterLocationChart = memo(
  ({ characters }: CharacterLocationChartProps) => {
    const { chartConfig, chartData } = useCharacterLocationChart(characters);

    return (
      <div className="flex flex-col overflow-hidden p-4 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-square w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="name" />
          </PieChart>
        </ChartContainer>
        <CustomLegend
          payload={chartData.map((item) => ({
            name: item.name,
            count: item.count,
            color: item.fill,
          }))}
        />
      </div>
    );
  },
);

CharacterLocationChart.displayName = "CharacterLocationChart";
