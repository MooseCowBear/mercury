import React from "react";
import { render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome";

describe("Welcome", () => {
  it ("displays correct heading", () => {
    render(<Welcome />);
    const heading = screen.getByRole("heading").textContent;
    expect(heading).toMatch(/welcome/i);
  })
});
