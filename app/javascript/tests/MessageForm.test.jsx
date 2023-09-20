import React from "react";
import { render, screen } from "@testing-library/react";
import MessageForm from "../components/MessageForm";

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
});
