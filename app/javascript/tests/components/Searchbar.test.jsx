import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Searchbar from "../../frontend/components/SearchBar";

describe("Searchbar", () => {
  it("renders its title", () => {
    const mockHandler = jest.fn();
    render(<Searchbar title={"test title"} onChangeHandler={mockHandler} />);
    expect(screen.queryByText("test title")).not.toBeNull();
  });

  it("updates its input value in response to user input", async () => {
    const mockHandler = jest.fn();
    render(<Searchbar title={"test title"} onChangeHandler={mockHandler} />);
    const input = screen.getByLabelText("search");

    await userEvent.type(input, "23");
    expect(input.value).toBe("23");
  });

  it("calls its changehandler in response to user input", async () => {
    const mockHandler = jest.fn();
    render(<Searchbar title={"test title"} onChangeHandler={mockHandler} />);
    const input = screen.getByLabelText("search");

    await userEvent.type(input, "23");
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
