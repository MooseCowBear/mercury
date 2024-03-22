import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewTextMessageInput from "../../frontend/components/NewTextMessageInput";
import { renderWithContexts } from "../contextWrapper";
import { postResource } from "../../frontend/utils/apiRequest";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource: jest.fn(),
}));

describe("NewTextMessageInput", () => {
  it("displays join a chat message if no current chat", () => {
    renderWithContexts(<NewTextMessageInput />, [
      {
        context: "UserInfoContext",
        contextValue: { userInfo: { id: 1, current_chat_id: null } },
      },
    ]);

    expect(
      screen.queryByPlaceholderText(/join a chat to message/i)
    ).not.toBeNull();
  });

  it("displays unblock message if current chat is blocked", () => {
    renderWithContexts(<NewTextMessageInput />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: { id: 1, current_chat_id: 1, current_chat_silenced: true },
        },
      },
    ]);

    expect(
      screen.queryByPlaceholderText(/Unblock to send a message/i)
    ).not.toBeNull();
  });

  it("displays expected message when current chat is not blocked", () => {
    renderWithContexts(<NewTextMessageInput />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: { id: 1, current_chat_id: 1, current_chat_silenced: false },
        },
      },
    ]);

    expect(
      screen.queryByPlaceholderText(/What's on your mind.../i)
    ).not.toBeNull();
  });

  it("shows error message if input is empty when submitted", async () => {
    const user = userEvent.setup();

    renderWithContexts(<NewTextMessageInput />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: { id: 1, current_chat_id: 1, current_chat_silenced: false },
        },
      },
    ]);

    await user.click(screen.getByLabelText("send"));
    expect(screen.queryByText("Message must have content.")).not.toBeNull();
  });

  it("submits post request if input not empty when submitted", async () => {
    postResource.mockReturnValue(Promise.resolve());
    const user = userEvent.setup();

    renderWithContexts(<NewTextMessageInput />, [
      {
        context: "UserInfoContext",
        contextValue: {
          userInfo: { id: 1, current_chat_id: 1, current_chat_silenced: false },
        },
      },
    ]);

    await user.type(screen.getByLabelText("message form"), "hello");
    expect(screen.queryByDisplayValue("hello")).not.toBeNull();
    await user.click(screen.getByLabelText("send"));
    expect(postResource.mock.calls.length).toBe(1);
  });
});
