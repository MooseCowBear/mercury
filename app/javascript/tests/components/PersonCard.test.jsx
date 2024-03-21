import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PersonCard from "../../frontend/components/PersonCard";
import { isUserActive } from "../../frontend/utils/users";

jest.mock("../../frontend/utils/users", () => ({
  isUserActive: jest.fn(),
}));

describe("PersonCard", () => {
  it("displays person's name", () => {
    const testPerson = {
      username: "test person",
      last_active: null,
    };
    const mockHandler = jest.fn();
    render(<PersonCard person={testPerson} setSelectedPeople={mockHandler} />);
    expect(screen.queryByText("test person")).not.toBeNull();
  });

  it("says active if user is active", () => {
    const testPerson = {
      username: "test person",
      last_active: null,
    };
    const mockHandler = jest.fn();
    isUserActive.mockReturnValue(true);
    render(<PersonCard person={testPerson} setSelectedPeople={mockHandler} />);
    expect(screen.queryByText("active")).not.toBeNull();
  });

  it("does not say active if user not active", () => {
    const testPerson = {
      username: "test person",
      last_active: null,
    };
    const mockHandler = jest.fn();
    isUserActive.mockReturnValue(false);
    render(<PersonCard person={testPerson} setSelectedPeople={mockHandler} />);
    expect(screen.queryByText("active")).toBeNull();
  });

  it("calls setSelectedPeople when clicked", async () => {
    const user = userEvent.setup();

    const testPerson = {
      username: "test person",
      last_active: null,
    };
    const mockHandler = jest.fn();
    render(<PersonCard person={testPerson} setSelectedPeople={mockHandler} />);
    await user.click(screen.getByRole("button"));
    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
