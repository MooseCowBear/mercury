import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessageContainer from "../../frontend/components/MessageContainer";
import { renderWithContexts } from "../contextWrapper";
import { useMessages } from "../../frontend/hooks/useMessages";

jest.mock("../../frontend/hooks/useMessages", () => ({
  useMessages: jest.fn(),
}));

jest.mock("../../frontend/components/Message", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-message" />;
  },
}));

describe("MessageContainer", () => {
  it("renders each message", () => {
    useMessages.mockReturnValueOnce({
      error: null,
      messages: [{ id: 1 }, { id: 2 }],
      setMessages: jest.fn(),
    });

    renderWithContexts(<MessageContainer />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: {
            id: 1,
            current_chat_id: 1,
            current_chat_silenced: false,
          },
        },
      },
      {
        context: "ActionCableContext",
        contextValue: { cable: null },
      },
    ]);

    expect(screen.getAllByTestId("mock-message").length).toBe(2);
  });

  it("displays error message if error", () => {
    useMessages.mockReturnValueOnce({
      error: true,
      messages: [],
      setMessages: jest.fn(),
    });

    renderWithContexts(<MessageContainer />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: {
            id: 1,
            current_chat_id: 1,
            current_chat_silenced: false,
          },
        },
      },
      {
        context: "ActionCableContext",
        contextValue: { cable: null },
      },
    ]);

    expect(screen.queryByText("Something went wrong.")).not.toBeNull();
  });

  it("displays loading screen", async () => {
    useMessages.mockReturnValueOnce({
      error: false,
      messages: [],
      setMessages: jest.fn(),
    });

    renderWithContexts(<MessageContainer />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: null,
        },
      },
      {
        context: "ActionCableContext",
        contextValue: { cable: null },
      },
    ]);
    expect(screen.findByText("Loading...")).not.toBeNull();
  });
});
