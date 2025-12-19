import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchInput } from "../search-input";

describe("[Unit] SearchInput", () => {
  it("should render correctly with initial value", () => {
    render(<SearchInput value="Initial" onChange={vi.fn()} />);

    const input = screen.getByDisplayValue("Initial");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "search");
  });

  it("should call onChange with the new value when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <SearchInput value="" onChange={handleChange} />,
    );

    const input = screen.getByRole("searchbox");

    await user.type(input, "R");
    expect(handleChange).toHaveBeenCalledWith("R");

    rerender(<SearchInput value="R" onChange={handleChange} />);

    await user.type(input, "i");
    expect(handleChange).toHaveBeenCalledWith("Ri");
  });
});
