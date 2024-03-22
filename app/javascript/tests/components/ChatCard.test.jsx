import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatCard from "../../frontend/components/ChatCard";
import { renderWithContexts } from "../contextWrapper";
import { postResource } from "../../frontend/utils/apiRequest";
import {
  blocked,
  chatInitial,
  chatMembers,
  chatTitle,
  clearNotifications,
} from "../../frontend/utils/chats";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource: jest.fn(),
}));

jest.mock("../../frontend/utils/chats", () => ({
  blocked: jest.fn(),
  chatInitial: jest.fn(),
  chatMembers: jest.fn(),
  chatTitle: jest.fn(),
  clearNotifications: jest.fn(),
}));

jest.mock("../../frontend/icons/Group", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-group" />;
  },
}));

describe("ChatCard", () => {
  it("displays chat name", () => {
    const testChat = { name: "test chat", is_private: false };
    chatTitle.mockReturnValue("test chat");

    renderWithContexts(<ChatCard chat={testChat} />, [
      { context: "UserInfoContext", contextValue: { userInfo: { id: 1 } } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    expect(screen.queryByText(/test chat/i)).not.toBeNull();
  });

  it("displays notification count if private chat", () => {
    const testChat = {
      name: "test chat",
      is_private: true,
      notification_count: 3,
    };

    renderWithContexts(<ChatCard chat={testChat} />, [
      { context: "UserInfoContext", contextValue: { userInfo: { id: 1 } } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    expect(screen.queryByText("3")).not.toBeNull();
  });

  it("renders group icon if private", () => {
    const testChat = {
      name: "test chat",
      is_private: true,
      notification_count: 3,
    };

    renderWithContexts(<ChatCard chat={testChat} />, [
      { context: "UserInfoContext", contextValue: { userInfo: { id: 1 } } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    expect(screen.queryByTestId("mock-group")).not.toBeNull();
  });

  it("renders message preview if last message", () => {
    const testChat = {
      name: "test chat",
      is_private: false,
      last_message: { body: "last" },
    };

    renderWithContexts(<ChatCard chat={testChat} />, [
      { context: "UserInfoContext", contextValue: { userInfo: { id: 1 } } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    expect(screen.queryByText(/last/i)).not.toBeNull();
  });

  it("sends post request when clicked", async () => {
    const user = userEvent.setup();
    const testChat = { name: "test chat", is_private: false };
    postResource.mockReturnValue(Promise.resolve());

    renderWithContexts(<ChatCard chat={testChat} />, [
      { context: "UserInfoContext", contextValue: { userInfo: { id: 1 } } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    await user.click(screen.getByLabelText("select chat"));
    expect(postResource.mock.calls.length).toBe(1);
  });
});
