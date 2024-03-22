import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewPublicChatForm from "../../frontend/components/NewPublicChatForm";
import { renderWithContexts } from "../contextWrapper";
import { postResource } from "../../frontend/utils/apiRequest";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource: jest.fn(),
}));

describe("NewPublicChatForm", () => {
  it("has submit button", () => {
    const mockHandler = jest.fn();

    renderWithContexts(<NewPublicChatForm setNewChatForm={mockHandler} />, [
      { context: "UserInfoContext", contextValue: { setUserInfo: jest.fn() } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PublicChatsContext",
        contextValue: { setPublicChats: jest.fn() },
      },
    ]);

    expect(screen.queryByRole("button", { name: /create/i })).not.toBeNull();
  });

  it("has cancel button", () => {
    const mockHandler = jest.fn();

    renderWithContexts(<NewPublicChatForm setNewChatForm={mockHandler} />, [
      { context: "UserInfoContext", contextValue: { setUserInfo: jest.fn() } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PublicChatsContext",
        contextValue: { setPublicChats: jest.fn() },
      },
    ]);

    expect(screen.queryByRole("button", { name: /cancel/i })).not.toBeNull();
  });

  it("shows error if submit empty input", async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    renderWithContexts(<NewPublicChatForm setNewChatForm={mockHandler} />, [
      { context: "UserInfoContext", contextValue: { setUserInfo: jest.fn() } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PublicChatsContext",
        contextValue: { setPublicChats: jest.fn() },
      },
    ]);

    await user.click(screen.getByRole("button", { name: /create/i }));
    expect(
      screen.queryByText("Chat must have a name under 45 characters.")
    ).not.toBeNull();
  });

  it("makes post request when submitted", async () => {
    postResource.mockReturnValue(Promise.resolve());
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    renderWithContexts(<NewPublicChatForm setNewChatForm={mockHandler} />, [
      { context: "UserInfoContext", contextValue: { setUserInfo: jest.fn() } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { chats: true } },
      },
      {
        context: "PublicChatsContext",
        contextValue: { setPublicChats: jest.fn() },
      },
    ]);

    await user.type(screen.getByLabelText("new chat name"), "new chat");
    expect(screen.queryByDisplayValue("new chat")).not.toBeNull();
    await user.click(screen.getByRole("button", { name: /create/i }));
    expect(postResource.mock.calls.length).toBe(1);
  });
});
