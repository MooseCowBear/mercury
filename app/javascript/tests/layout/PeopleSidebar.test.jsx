import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PeopleSidebar from "../../frontend/layout/PeopleSidebar";
import { renderWithContexts } from "../contextWrapper";
import { usePeople } from "../../frontend/hooks/usePeople";

jest.mock("../../frontend/hooks/usePeople", () => ({
  usePeople: jest.fn(),
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
  it("renders a PersonCard for every person", () => {
    usePeople.mockReturnValueOnce({
      error: null,
      loading: false,
      people: [
        { id: 1, username: "alice" },
        { id: 2, username: "bob" },
      ],
    });

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);

    expect(screen.getAllByTestId("mock-person-card").length).toBe(2);
  });

  it("renders a Searchbar", () => {
    usePeople.mockReturnValueOnce({
      error: null,
      loading: false,
      people: [],
    });

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);

    expect(screen.queryByTestId("mock-searchbar")).not.toBeNull();
  });

  it("renders new private chat form", () => {
    usePeople.mockReturnValueOnce({
      error: null,
      loading: false,
      people: [],
    });

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);

    expect(screen.queryByTestId("mock-private-chat-form")).not.toBeNull();
  });

  it("renders error message if error thrown", () => {
    usePeople.mockReturnValueOnce({
      error: true,
      loading: false,
      people: [],
    });

    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);

    expect(screen.queryByText("Something went wrong")).not.toBeNull();
  });

  it("renders loading message if loading", () => {
    usePeople.mockReturnValueOnce({
      error: false,
      loading: true,
      people: [],
    });
    renderWithContexts(<PeopleSidebar />, [
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
    ]);
    expect(screen.queryByText("Loading...")).not.toBeNull();
  });
});
