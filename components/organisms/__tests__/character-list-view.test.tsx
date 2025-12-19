import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { DashboardSectionHeaderProps } from "@/components/molecules/dashboard-section-header";
import type { Character } from "@/types";

import { CharacterListView } from "../character-list-view";

vi.mock("../character-table", () => ({
  CharacterTable: ({ characters }: { characters: Character[] }) => (
    <div data-testid="character-table">
      {characters.map((c) => (
        <div key={c.id} data-testid={`character-row-${c.id}`}>
          {c.name}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../character-table-loading-state", () => ({
  CharacterTableLoadingState: () => (
    <div data-testid="loading-state">Loading...</div>
  ),
}));

vi.mock("../../molecules/character-error-state", () => ({
  CharacterErrorState: () => <div data-testid="error-state">Error</div>,
}));

vi.mock("../../molecules/character-empty-state", () => ({
  CharacterEmptyState: () => <div data-testid="empty-state">Empty</div>,
}));

vi.mock("../../molecules/search-input", () => ({
  SearchInput: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock("../../atoms/infinite-scroll-trigger", () => ({
  InfiniteScrollTrigger: ({
    children,
    onIntersect,
  }: {
    children: React.ReactNode;
    onIntersect: () => void;
  }) => (
    <div data-testid="infinite-scroll-trigger">
      <button onClick={onIntersect} data-testid="trigger-button">
        Load More
      </button>
      {children}
    </div>
  ),
}));

vi.mock("../../atoms/load-more-characters-loader", () => ({
  LoadMoreCharactersLoader: () => (
    <div data-testid="load-more-loader">Loading more...</div>
  ),
}));

vi.mock("../../atoms/end-of-character-list-notice", () => ({
  EndOfCharacterListNotice: () => (
    <div data-testid="end-of-list">End of list</div>
  ),
}));

vi.mock("../dashboard-section", () => ({
  DashboardSection: ({
    header,
    children,
  }: {
    header: DashboardSectionHeaderProps;
    children: React.ReactNode;
  }) => (
    <div data-testid="dashboard-section">
      <div data-testid="dashboard-header-title">{header.title}</div>
      <div data-testid="dashboard-header-description">{header.description}</div>
      <div data-testid="dashboard-header-children">{header.children}</div>
      {children}
    </div>
  ),
}));

describe("[Unit] CharacterListView", () => {
  const mockCharacters: Character[] = [
    {
      id: "1",
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "rick.jpg",
    },
    {
      id: "2",
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      image: "morty.jpg",
    },
  ];

  const defaultProps = {
    characters: mockCharacters,
    totalCount: 10,
    isLoading: false,
    isError: false,
    search: "",
    onSearchChange: vi.fn(),
    fetchNextPage: vi.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  };

  it("renders loading state when isLoading is true", () => {
    render(<CharacterListView {...defaultProps} isLoading={true} />);
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
    expect(
      screen.getByTestId("dashboard-header-description"),
    ).toHaveTextContent("Loading...");
  });

  it("renders error state when isError is true", () => {
    render(<CharacterListView {...defaultProps} isError={true} />);
    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  });

  it("renders empty state when characters array is empty", () => {
    render(<CharacterListView {...defaultProps} characters={[]} />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders character table with characters when data is available", () => {
    render(<CharacterListView {...defaultProps} />);
    expect(screen.getByTestId("character-table")).toBeInTheDocument();
    expect(screen.getByTestId("character-row-1")).toHaveTextContent(
      "Rick Sanchez",
    );
    expect(screen.getByTestId("character-row-2")).toHaveTextContent(
      "Morty Smith",
    );
  });

  it("renders correct description count", () => {
    render(<CharacterListView {...defaultProps} />);
    expect(
      screen.getByTestId("dashboard-header-description"),
    ).toHaveTextContent(
      `You're viewing ${mockCharacters.length} of 10 characters`,
    );
  });

  it("calls onSearchChange when search input changes", () => {
    const onSearchChange = vi.fn();
    render(
      <CharacterListView {...defaultProps} onSearchChange={onSearchChange} />,
    );

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Rick" } });

    expect(onSearchChange).toHaveBeenCalledWith("Rick");
  });

  it("calls fetchNextPage when infinite scroll triggers", () => {
    const fetchNextPage = vi.fn();
    render(
      <CharacterListView {...defaultProps} fetchNextPage={fetchNextPage} />,
    );

    fireEvent.click(screen.getByTestId("trigger-button"));

    expect(fetchNextPage).toHaveBeenCalled();
  });

  it("shows load more loader when fetching next page", () => {
    render(<CharacterListView {...defaultProps} isFetchingNextPage={true} />);
    expect(screen.getByTestId("load-more-loader")).toBeInTheDocument();
  });

  it("shows end of list notice when no more pages", () => {
    render(<CharacterListView {...defaultProps} hasNextPage={false} />);
    expect(screen.getByTestId("end-of-list")).toBeInTheDocument();
  });
});
