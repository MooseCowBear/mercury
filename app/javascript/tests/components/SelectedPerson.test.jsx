import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SelectedPerson from "../../frontend/components/SelectedPerson";

describe("SelectedPerson", () => {
  it("renders person's name", () => {
    const mockHandler = jest.fn();
    const testPerson = { username: "test person" };
    render(
      <SelectedPerson
        selectedPerson={testPerson}
        setSelectedPeople={mockHandler}
      />
    );
    expect(screen.queryByText("test person")).not.toBeNull();
  });

  it("calls setSelectedPeople when button clicked", async () => {
    const user = userEvent.setup();

    const mockHandler = jest.fn();
    const testPerson = { username: "test person" };
    render(
      <SelectedPerson
        selectedPerson={testPerson}
        setSelectedPeople={mockHandler}
      />
    );

    const button = screen.getByRole("button");
    await user.click(button);
    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
