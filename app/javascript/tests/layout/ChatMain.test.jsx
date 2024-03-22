import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatMain from "../../frontend/layout/ChatMain";
import { renderWithContexts } from "../contextWrapper";
import { chatTitle } from "../../frontend/utils/chats";

jest.mock("../../frontend/utils/chats", () => ({
  chatTitle: jest.fn(),
}));

jest.mock("../../frontend/components/MessageContainer", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-container" />;
  },
}));

jest.mock("../../frontend/components/MessageFormContainer", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-form-container" />;
  },
}));

describe("ChatMain", () => {
  it("renders message container, form, and chat title", () => {
    chatTitle.mockReturnValue("test title");
    renderWithContexts(<ChatMain />, [
      { context: "UserInfoContext", contextValue: { userInfo: true } },
      {
        context: "VisibilityContext",
        contextValue: { visibility: { messages: true } },
      },
    ]);

    expect(screen.queryByTestId("mock-container")).not.toBeNull();
    expect(screen.queryByTestId("mock-form-container")).not.toBeNull();
    expect(screen.queryByText("test title"));
  });
});
