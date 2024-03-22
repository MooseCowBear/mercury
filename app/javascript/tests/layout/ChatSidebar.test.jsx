import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatSidebar from "../../frontend/layout/ChatSidebar";
import { filterChats } from "../../frontend/utils/chats";
import { renderWithContexts } from "../contextWrapper";

jest.mock("../../frontend/utils/chats", () => ({
  filterChats: jest.fn(),
}));

jest.mock("../../frontend/components/Searchbar", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-searchbar" />;
  },
}));

jest.mock("../../frontend/components/ChatsContainer", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-container" />;
  },
}));

describe("ChatSidebar", () => {
  it("renders search bar", () => {
    filterChats.mockReturnValue([]);

    renderWithContexts(<ChatSidebar />, [
      { context: "UserInfoContext", contextValue: { userInfo: true } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      { context: "PrivateChatsContext", contextValue: { privateChats: [] } },
      { context: "PublicChatsContext", contextValue: { publicChats: [] } },
    ]);
    expect(screen.queryByTestId("mock-searchbar")).not.toBeNull();
  });

  it("renders two chat containers", () => {
    filterChats.mockReturnValue([]);

    renderWithContexts(<ChatSidebar />, [
      { context: "UserInfoContext", contextValue: { userInfo: true } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      { context: "PrivateChatsContext", contextValue: { privateChats: [] } },
      { context: "PublicChatsContext", contextValue: { publicChats: [] } },
    ]);

    expect(screen.queryAllByTestId("mock-container").length).toBe(2);
  });

  it("renders loading message if no user", () => {
    filterChats.mockReturnValue([]);

    renderWithContexts(<ChatSidebar />, [
      { context: "UserInfoContext", contextValue: { userInfo: false } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      { context: "PrivateChatsContext", contextValue: { privateChats: [] } },
      { context: "PublicChatsContext", contextValue: { publicChats: [] } },
    ]);
    expect(screen.queryByText("Loading...")).not.toBeNull();
  });
});
