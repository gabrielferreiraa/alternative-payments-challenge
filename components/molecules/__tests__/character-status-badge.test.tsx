import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CharacterStatusBadge } from "../character-status-badge";

describe("[Unit] CharacterStatusBadge", () => {
  it("renders Alive badge correctly", () => {
    render(<CharacterStatusBadge status="Alive" />);
    
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("renders Dead badge correctly", () => {
    render(<CharacterStatusBadge status="Dead" />);
    
    expect(screen.getByText("Dead")).toBeInTheDocument();
  });

  it("renders Unknown badge for 'unknown' status", () => {
    render(<CharacterStatusBadge status="unknown" />);
    
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("renders Unknown badge for null status", () => {
    render(<CharacterStatusBadge status={null} />);
    
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("renders Unknown badge for undefined status", () => {
    render(<CharacterStatusBadge status={undefined} />);
    
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("renders Unknown badge for invalid status string", () => {
    render(<CharacterStatusBadge status="JustNotExist" />);
    
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
