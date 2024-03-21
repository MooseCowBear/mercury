import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SendMessageButton from "../../frontend/components/SendMessageButton";

describe("SendMessageButton", () => {
  it("calls submithandler when clicked", async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();
    render(<SendMessageButton submitHandler={mockHandler} />);

    await user.click(screen.getByRole("button"));
    expect(mockHandler.mock.calls.length).toBe(1);
  });

  it("is disabled if disable true", () => {
    const mockHandler = jest.fn();
    render(<SendMessageButton submitHandler={mockHandler} disable={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
