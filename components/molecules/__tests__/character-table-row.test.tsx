import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Table, TableBody } from "@/components/ui/table";
import type { Character } from "@/types";

import { CharacterTableRow } from "../character-table-row";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="character-image" />
  ),
}));

describe("[Unit] CharacterTableRow", () => {
  const mockCharacter: Character = {
    id: "1",
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "rick-image.jpg",
    location: { id: "10", name: "Earth (C-137)" },
  };

  const renderComponent = (character: Character = mockCharacter) => {
    return render(
      <Table>
        <TableBody>
          <CharacterTableRow character={character} />
        </TableBody>
      </Table>,
    );
  };

  it("renders character details correctly", () => {
    renderComponent();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getAllByText("Earth (C-137)")).toHaveLength(2); // One mobile hidden, one visible
  });

  it("renders status badge", () => {
    renderComponent();
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("renders character avatar", () => {
    renderComponent();
    const image = screen.getByTestId("character-image");
    expect(image).toHaveAttribute("src", "rick-image.jpg");
    expect(image).toHaveAttribute("alt", "Rick Sanchez");
  });
});
