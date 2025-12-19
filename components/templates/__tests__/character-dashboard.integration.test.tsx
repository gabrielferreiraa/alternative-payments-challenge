import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as fetcherModule from "@/lib/graphql-fetcher";

import { CharacterDashboard } from "../character-dashboard";

vi.mock("@/lib/graphql-fetcher", () => ({
  fetcher: vi.fn(),
}));

vi.mock("recharts", async () => {
  const original = await vi.importActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 500, height: 500 }}>{children}</div>
    ),
  };
});

describe("[Integration] CharacterDashboard", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it("should fetch and display characters from the API integration", async () => {
    const mockData = {
      characters: {
        info: {
          count: 2,
          pages: 1,
          next: null,
        },
        results: [
          {
            id: "1",
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            image: "/rick.jpg",
            location: {
              id: "1",
              name: "Earth",
            },
          },
          {
            id: "2",
            name: "Morty Smith",
            status: "Alive",
            species: "Human",
            image: "/morty.jpg",
            location: {
              id: "1",
              name: "Earth",
            },
          },
        ],
      },
    };

    vi.spyOn(fetcherModule, "fetcher").mockReturnValue(() =>
      Promise.resolve(mockData),
    );

    render(<CharacterDashboard />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });

    expect(
      screen.getByText("You're viewing 2 of 2 characters"),
    ).toBeInTheDocument();
  });

  it("should handle API errors gracefully", async () => {
    vi.spyOn(fetcherModule, "fetcher").mockReturnValue(() =>
      Promise.reject(new Error("Network Error")),
    );

    render(<CharacterDashboard />, { wrapper: Wrapper });

    await waitFor(() => {
      const errorMessages = screen.getAllByText("Failed to load characters");
      expect(errorMessages.length).toBeGreaterThan(0);
      expect(errorMessages[0]).toBeInTheDocument();
    });
  });
});
