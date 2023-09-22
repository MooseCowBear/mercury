import React from "react";
import { render, screen } from "@testing-library/react";
import Message from "../components/Message";
import userEvent from "@testing-library/user-event";

jest.mock("../helpers/apiRequest", () => ({
  makeGetRequest: jest.fn(),
}));

jest.mock("../components/MessageForm", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-message-form" />;
  },
}));

jest.mock("../components/MessageContent", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-message-content" />;
  },
}));

describe("Message", () => {
  const mockUser = { id: 1 };
  const mockCallback = jest.fn();

  it("renders message content", () => {
    const mockMessage = {
      id: 1,
      body: "test message",
      user: { id: 1, username: "test user" },
    };
    render(
      <Message
        user={mockUser}
        message={mockMessage}
        currentRoom={null}
        messages={[]}
        setMessages={mockCallback}
        interlocutor={null}
      />
    );

    expect(screen.queryByTestId("mock-message-content")).not.toBeNull();
  });

  it("displays edit and delete buttons if message belongs to user", () => {
    const mockMessage = {
      id: 1,
      body: "test message",
      user: { id: 1, username: "test user" },
    };
    render(
      <Message
        user={mockUser}
        message={mockMessage}
        currentRoom={null}
        messages={[]}
        setMessages={mockCallback}
        interlocutor={null}
      />
    );

    expect(screen.queryAllByRole("button", { name: "edit" })).not.toBeNull();
    expect(screen.queryByRole("button", { name: "delete" })).not.toBeNull();
  });

  it("does not display message form if not editing", () => {
    const mockMessage = {
      id: 1,
      body: "test message",
      user: { id: 1, username: "test user" },
    };
    render(
      <Message
        user={mockUser}
        message={mockMessage}
        currentRoom={null}
        messages={[]}
        setMessages={mockCallback}
        interlocutor={null}
      />
    );

    expect(screen.queryByTestId("mock-message-form")).toBeNull();
  });

  it("displays message form if editing", async () => {
    const user = userEvent.setup();
    const mockMessage = {
      id: 1,
      body: "test message",
      user: { id: 1, username: "test user" },
    };
    render(
      <Message
        user={mockUser}
        message={mockMessage}
        currentRoom={null}
        messages={[]}
        setMessages={mockCallback}
        interlocutor={null}
      />
    );

    const editBtn = screen.getByRole("button", { name: "edit" });
    await user.click(editBtn);

    expect(screen.queryByTestId("mock-message-form")).not.toBeNull();
  });
});

// user,
//   message,
//   currentRoom,
//   messages,
//   setMessages,
//   interlocutor,
