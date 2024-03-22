import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PeopleSidebar from "../../frontend/layout/PeopleSidebar";
import { getResource } from "../../frontend/utils/apiRequest";
import { renderWithContexts } from "../contextWrapper";

jest.mock("../../frontend/utils/apiRequest", () => ({
  getResource: jest.fn(),
}));

jest.mock("../../frontend/components/PersonCard", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-person-card" />;
  },
}));

jest.mock("../../frontend/components/Searchbar", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-searchbar" />;
  },
}));

jest.mock("../../frontend/components/NewPrivateChatForm", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-private-chat-form" />;
  },
}));

describe("PeopleSidebar", () => {
  it("renders a PersonCard for every person", async () => {
    getResource.mockReturnValueOnce(
      Promise.resolve([
        { id: 1, username: "alice" },
        { id: 2, username: "bob" },
      ])
    );

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);
    await waitFor(() => {
      expect(screen.getAllByTestId("mock-person-card").length).toBe(2);
    });
  });

  it("renders a Searchbar", async () => {
    getResource.mockReturnValueOnce(Promise.resolve([]));

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);
    await waitFor(() => {
      expect(screen.queryByTestId("mock-searchbar")).not.toBeNull();
    });
  });

  it("renders new private chat form", async () => {
    getResource.mockReturnValueOnce(Promise.resolve([]));

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);
    await waitFor(() => {
      expect(screen.queryByTestId("mock-private-chat-form")).not.toBeNull();
    });
  });

  it("renders error message if error thrown", async () => {
    getResource.mockRejectedValue(new Error("error"));

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);
    await waitFor(() => {
      expect(screen.queryByText("Something went wrong")).not.toBeNull();
    });
  });

  it("renders loading message before fetch completes", async () => {
    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeNull();
    });
  });
});
