import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MessageFormContainer from "../../frontend/components/MessageFormContainer";
import { useUserInfoContext } from "../../frontend/contexts/UserInfoContext";
import { blocked } from "../../frontend/utils/chats";

jest.mock("../../frontend/components/NewTextMessageInput", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-text-message-input" />;
  },
}));

jest.mock("../../frontend/components/NewImageMessageInput", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-image-message-input" />;
  },
}));

jest.mock("../../frontend/utils/chats", () => ({
  blocked: jest.fn(),
}));

jest.mock("../../frontend/contexts/UserInfoContext", () => ({
  useUserInfoContext: jest.fn(),
}));

describe("MessageFormContainer", () => {
  it("defaults to rendering NewTextMessageInput", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    render(<MessageFormContainer />);
    expect(screen.queryByTestId("mock-text-message-input")).not.toBeNull();
  });

  it("renders NewImageMessageInput after add image button is clicked", async () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    blocked.mockReturnValue(false);

    const user = userEvent.setup();

    render(<MessageFormContainer />);
    expect(screen.getByLabelText("add image")).not.toBeDisabled();
    await user.click(screen.getByLabelText("add image"));
    expect(screen.queryByLabelText("cancel")).not.toBeNull();
    expect(screen.queryByTestId("mock-image-message-input")).not.toBeNull();
  });

  it("renders NewTextMessageInput after cancel button has been clicked", async () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    blocked.mockReturnValue(false);
    const user = userEvent.setup();

    render(<MessageFormContainer />);
    await user.click(screen.getByLabelText("add image"));
    await user.click(screen.getByLabelText("cancel"));
    expect(screen.queryByTestId("mock-text-message-input")).not.toBeNull();
  });

  it("add image button is disabled if blocked returns true", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    blocked.mockReturnValue(true);
    render(<MessageFormContainer />);
    expect(screen.getByLabelText("add image")).toBeDisabled();
  });
});
