import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MuteButton from "../../frontend/components/MuteButton";
import { renderWithContexts } from "../contextWrapper";
import { postResource2 } from "../../frontend/utils/apiRequest";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource2: jest.fn(),
}));

describe("MuteButton", () => {
  it("renders a button with label mute if not currently muted", () => {
    renderWithContexts(<MuteButton currentlyMuted={false} />, [
      {
        context: "UserInfoContext",
        contextValue: { userInfo: true, setUserInfo: jest.fn() },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    expect(screen.queryByLabelText("mute")).not.toBeNull();
  });

  it("renders a button with label unmute if currently muted", () => {
    renderWithContexts(<MuteButton currentlyMuted={true} />, [
      {
        context: "UserInfoContext",
        contextValue: { userInfo: true, setUserInfo: jest.fn() },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    expect(screen.queryByLabelText("unmute")).not.toBeNull();
  });

  it("sends a post request when clicked", async () => {
    postResource2.mockReturnValue(Promise.resolve([]));
    const user = userEvent.setup();

    renderWithContexts(<MuteButton currentlyMuted={true} />, [
      {
        context: "UserInfoContext",
        contextValue: { userInfo: true, setUserInfo: jest.fn() },
      },
      {
        context: "PrivateChatsContext",
        contextValue: { privateChats: [], setPrivateChats: jest.fn() },
      },
    ]);

    await user.click(screen.getByLabelText("unmute"));
    expect(postResource2.mock.calls.length).toBe(1);
  });
});
