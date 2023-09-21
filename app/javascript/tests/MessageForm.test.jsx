import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageForm from "../components/MessageForm";
import { makePostRequest } from "../helpers/apiRequest";

jest.mock("../helpers/apiRequest", () => ({
  makePostRequest: jest.fn(),
}));

describe("MessageForm", () => {
  it("contains a text input for message body", () => {
    render(<MessageForm currentRoom={{ id: 0 }} />);

    expect(screen.queryByLabelText("message input")).not.toBeNull();
  });

  it("contains a send button", () => {
    render(<MessageForm currentRoom={{ id: 0 }} />);

    expect(screen.queryByLabelText(/send/i)).not.toBeNull();
  });

  it("contains a cancel button if editing", () => {
    render(<MessageForm currentRoom={{ id: 0 }} setEditing={() => {}} />);

    expect(screen.queryByRole("button", { name: "cancel" })).not.toBeNull();
  });

  it("displays error if empty form is submitted", async () => {
    makePostRequest.mockReturnValueOnce(
      Promise.resolve({ id: 1, body: "test" })
    );

    const user = userEvent.setup();
    render(<MessageForm currentRoom={{ id: 0 }} setEditing={null} />);

    const submitBtn = screen.getByLabelText("Send");
    await user.click(submitBtn);

    expect(screen.queryByText(/must have content/i));
  });
});
