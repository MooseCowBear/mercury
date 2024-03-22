import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu from "../../frontend/layout/Menu";
import { VisibilityProvider } from "../../frontend/contexts/VisibilityContext";

const defaultValue = {
  chatVisibilityHandler: jest.fn(),
  peopleVisibilityHandler: jest.fn(),
};

const renderComponent = (children, value = defaultValue) => {
  const elem = render(
    <VisibilityProvider value={value ?? defaultValue}>
      {children}
    </VisibilityProvider>
  );
  return elem;
};

describe("Menu", () => {
  it("renders people button", () => {
    renderComponent(<Menu />);
    expect(screen.queryByLabelText("view chats")).not.toBeNull();
  });

  it("renders chat button", () => {
    renderComponent(<Menu />);
    expect(screen.queryByLabelText("find people")).not.toBeNull();
  });

  it("links to edit account", () => {
    renderComponent(<Menu />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/users/edit");
  });
});
