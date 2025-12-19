import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Character } from "@/types";

import { CharacterTable } from "../character-table";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="character-image" />
  ),
}));

describe("[Integration] CharacterTable", () => {
  const mockCharacters: Character[] = [
    {
      id: "1",
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "rick-image.jpg",
      location: { id: "10", name: "Earth (C-137)" },
    },
    {
      id: "2",
      name: "Morty Smith",
      status: "Dead",
      species: "Human",
      image: "morty-image.jpg",
      location: { id: "20", name: "Citadel of Ricks" },
    },
    {
      id: "3",
      name: "Alien Rick",
      status: "unknown",
      species: "Alien",
      image: null,
      location: { id: "30", name: "Space" },
    },
  ];

  it("renders a row for each character", () => {
    render(<CharacterTable characters={mockCharacters} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  it("displays correct character details in the cells", () => {
    render(<CharacterTable characters={mockCharacters} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();

    const humanSpecies = screen.getAllByText("Human");
    expect(humanSpecies).toHaveLength(2);
    expect(screen.getByText("Alien")).toBeInTheDocument();

    expect(screen.getAllByText("Earth (C-137)")).toHaveLength(2);
    expect(screen.getAllByText("Citadel of Ricks")).toHaveLength(2);
  });

  it("renders status badges correctly (Integration check)", () => {
    render(<CharacterTable characters={mockCharacters} />);

    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Dead")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("renders avatar image when provided", () => {
    render(<CharacterTable characters={mockCharacters} />);

    const images = screen.getAllByTestId("character-image");
    expect(images[0]).toHaveAttribute("src", "rick-image.jpg");
    expect(images[0]).toHaveAttribute("alt", "Rick Sanchez");
  });

  it("renders empty table gracefully when no characters provided", () => {
    render(<CharacterTable characters={[]} />);
    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(1);
  });
});
