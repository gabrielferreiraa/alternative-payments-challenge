import { type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as fetcherModule from "@/lib/graphql-fetcher";

import { useInfiniteCharacters } from "../use-infinite-characters";

// Mock the fetcher module
vi.mock("@/lib/graphql-fetcher", () => ({ fetcher: vi.fn() }));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const QueryClientWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  QueryClientWrapper.displayName = "QueryClientWrapper";

  return QueryClientWrapper;
};

describe("[Unit] useInfiniteCharacters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch initial data successfully", async () => {
    const mockData = {
      characters: {
        info: {
          next: 2,
          count: 20,
        },
        results: [
          { id: "1", name: "Rick" },
          { id: "2", name: "Morty" },
        ],
      },
    };

    const mockFetcherFn = vi.fn().mockResolvedValue(mockData);
    vi.mocked(fetcherModule.fetcher).mockReturnValue(mockFetcherFn);

    const { result } = renderHook(() => useInfiniteCharacters(""), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters).toHaveLength(2);
    expect(result.current.totalCount).toBe(20);
    expect(result.current.characters[0]).toHaveProperty("name", "Rick");
  });

  it("should handle search query", async () => {
    const mockData = {
      characters: {
        info: { next: null, count: 1 },
        results: [{ id: "1", name: "Rick Sanchez" }],
      },
    };

    const mockFetcherFn = vi.fn().mockResolvedValue(mockData);
    vi.mocked(fetcherModule.fetcher).mockReturnValue(mockFetcherFn);

    const { result } = renderHook(() => useInfiniteCharacters("Rick"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0].name).toBe("Rick Sanchez");
  });

  it("should handle empty results", async () => {
    const mockData = {
      characters: {
        info: { next: null, count: 0 },
        results: [],
      },
    };

    const mockFetcherFn = vi.fn().mockResolvedValue(mockData);
    vi.mocked(fetcherModule.fetcher).mockReturnValue(mockFetcherFn);

    const { result } = renderHook(() => useInfiniteCharacters("NonExistent"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.characters).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("should filter out null results", async () => {
    const mockData = {
      characters: {
        info: { next: null, count: 1 },
        results: [{ id: "1", name: "Rick" }, null],
      },
    };

    const mockFetcherFn = vi.fn().mockResolvedValue(mockData);
    vi.mocked(fetcherModule.fetcher).mockReturnValue(mockFetcherFn);

    const { result } = renderHook(() => useInfiniteCharacters(""), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.characters).toHaveLength(1);
    expect(result.current.characters[0].name).toBe("Rick");
  });
});
