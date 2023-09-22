import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ChatMessages from "../components/ChatMessages";
import { makeGetRequest } from "../helpers/apiRequest";
//import { subscribeToChatChannel, unsubscribeToChatChannel } from "../channels/chat_channel";

jest.mock("../helpers/apiRequest", () => ({
  makeGetRequest: jest.fn(),
}));

jest.mock("../channels/chat_channel", () => {
  const originalModule = jest.requireActual("../channels/chat_channel");

  return {
    __esModule: true,
    ...originalModule,
    subscribeToChatChannel: jest.fn(),
    unsubscribeToChatChannel: jest.fn(),
  };
});

jest.mock("../components/MessageForm", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="message-form" />;
  },
}));

jest.mock("../components/Message", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="message" />;
  },
}));

describe("ChatMessages", () => {
  it("displays message form", async () => {
    makeGetRequest.mockReturnValueOnce(Promise.resolve([]));

    render(
      <ChatMessages
        user={null}
        currentRoom={{ id: 1, name: "test room", is_private: false }}
        actionCable={null}
      />
    );

    await waitFor(() => {
      expect(screen.queryByTestId("message-form")).not.toBeNull();
    });
  });

  it("displays message for each message", async () => {
    makeGetRequest.mockReturnValueOnce(Promise.resolve([{ id: 1 }, { id: 2 }]));

    render(
      <ChatMessages
        user={null}
        currentRoom={{ id: 1, name: "test room", is_private: false }}
        actionCable={null}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("message").length).toBe(2);
    });
  });
});
