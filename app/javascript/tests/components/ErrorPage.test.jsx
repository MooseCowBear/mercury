import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ErrorPage from "../../frontend/pages/ErrorPage"

describe("ErrorPage", () => {
  it ("it contains a link back to /chat", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/chat");
  })
})