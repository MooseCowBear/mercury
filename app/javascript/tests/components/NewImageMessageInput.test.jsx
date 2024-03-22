import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewImageMessageInput from "../../frontend/components/NewImageMessageInput";
import { renderWithContexts } from "../contextWrapper";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource: jest.fn(),
}));

describe("NewImageMessageInput", () => {
  it("displays error message if no image has been uploaded on submit", async () => {
    const user = userEvent.setup();

    renderWithContexts(<NewImageMessageInput />, [
      {
        context: "UserInfoContext",
        contextValue: { userInfo: { current_chat_id: 1 } },
      },
    ]);

    await user.click(screen.getByLabelText("send"));
    expect(screen.queryByText("Message must have content")).not.toBeNull();
  });
});

// figure out how to do image uploads, or will that be covered by system tests?