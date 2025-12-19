import { useMemo } from "react";

import { type ChartConfig } from "@/components/ui/chart";
import type { Character } from "@/types";

const COLOR_PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
] as const;

function getCharacterLocationStats(characters: Character[]) {
  const locationCounts = new Map<string, number>();

  for (const character of characters) {
    const locationName = character?.location?.name ?? "Unknown";
    const currentCount = locationCounts.get(locationName) ?? 0;
    locationCounts.set(locationName, currentCount + 1);
  }

  return Array.from(locationCounts.entries())
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, count], index) => ({
      name,
      count,
      fill: COLOR_PALETTE[index % COLOR_PALETTE.length],
    }));
}

export function useCharacterLocationChart(characters?: Character[] | null) {
  const { chartData, chartConfig } = useMemo(() => {
    const data = getCharacterLocationStats(characters ?? []);

    const config: ChartConfig = Object.fromEntries(
      data.map((item) => [
        item.name,
        {
          label: item.name,
          color: item.fill,
        },
      ]),
    );

    return { chartData: data, chartConfig: config };
  }, [characters]);

  return { chartConfig, chartData };
}
