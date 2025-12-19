import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { useInfiniteCharacters } from "@/hooks/use-infinite-characters";

import { CharacterDashboard } from "../character-dashboard";

vi.mock("@/hooks/use-infinite-characters");

describe("[Unit] CharacterDashboard", () => {
  const mockFetchNextPage = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    (useInfiniteCharacters as Mock).mockReturnValue({
      characters: [],
      totalCount: 0,
      isLoading: false,
      isError: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should debounce the search input", async () => {
    render(<CharacterDashboard />);

    const input = screen.getByRole("searchbox");

    expect(useInfiniteCharacters).toHaveBeenCalledWith("");

    fireEvent.change(input, { target: { value: "Rick" } });

    expect(useInfiniteCharacters).not.toHaveBeenCalledWith("Rick");

    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(useInfiniteCharacters).toHaveBeenCalledWith("Rick");
  });
});
