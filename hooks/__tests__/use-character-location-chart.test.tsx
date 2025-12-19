import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useCharacterLocationChart } from "../use-character-location-chart";

describe("[Unit] useCharacterLocationChart", () => {
  it("should return empty chart data when characters is undefined or null", () => {
    const { result } = renderHook(() => useCharacterLocationChart(undefined));
    expect(result.current.chartData).toEqual([]);
    expect(result.current.chartConfig).toEqual({});

    const { result: resultNull } = renderHook(() =>
      useCharacterLocationChart(null),
    );
    expect(resultNull.current.chartData).toEqual([]);
    expect(resultNull.current.chartConfig).toEqual({});
  });

  it("should aggregate locations correctly", () => {
    const characters = [
      { location: { name: "Earth" } },
      { location: { name: "Earth" } },
      { location: { name: "Mars" } },
    ];

    const { result } = renderHook(() => useCharacterLocationChart(characters));

    expect(result.current.chartData).toHaveLength(2);
    expect(result.current.chartData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Earth", count: 2 }),
        expect.objectContaining({ name: "Mars", count: 1 }),
      ]),
    );
  });

  it('should handle characters with missing location as "Unknown location"', () => {
    const characters = [
      { location: null },
      { location: { name: null } },
      { location: { name: "Earth" } },
    ];

    const { result } = renderHook(() => useCharacterLocationChart(characters));

    expect(result.current.chartData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Unknown", count: 2 }),
        expect.objectContaining({ name: "Earth", count: 1 }),
      ]),
    );
  });

  it("should generate correct chart config", () => {
    const characters = [{ location: { name: "Earth" } }];

    const { result } = renderHook(() => useCharacterLocationChart(characters));

    expect(result.current.chartConfig).toHaveProperty("Earth");
    expect(result.current.chartConfig["Earth"]).toEqual(
      expect.objectContaining({
        label: "Earth",
      }),
    );
    expect(result.current.chartConfig["Earth"]).toHaveProperty("color");
  });
});
