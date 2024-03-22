import React from "react";
import { screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessageContainer from "../../frontend/components/MessageContainer";
import { renderWithContexts } from "../contextWrapper";
import { getResource2 } from "../../frontend/utils/apiRequest";

jest.mock("../../frontend/utils/apiRequest", () => ({
  getResource2: jest.fn(),
}));

jest.mock("../../channels/chat_channel", () => {
  const originalModule = jest.requireActual("../../channels/chat_channel");

  return {
    __esModule: true,
    ...originalModule,
    subscribeToChatChannel: jest.fn(),
    unsubscribeToChatChannel: jest.fn(),
  };
});

jest.mock("../../frontend/components/Message", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-message" />;
  },
}));

describe("MessageContainer", () => {
  it("renders each message", async () => {
    getResource2.mockReturnValueOnce(Promise.resolve([{ id: 1 }, { id: 2 }]));

    await act(async () => {
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
    });

    expect(screen.getAllByTestId("mock-message").length).toBe(2);
  });

  it("displays error message if error", async () => {
    getResource2.mockRejectedValue(new Error("error"));

    await act(async () => {
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
    });

    expect(screen.queryByText("Something went wrong.")).not.toBeNull();
  });

  it("displays loading screen", async () => {
    getResource2.mockReturnValue(Promise.resolve([]));

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
