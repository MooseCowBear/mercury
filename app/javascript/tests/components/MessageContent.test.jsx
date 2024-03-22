import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MessageContent from "../../frontend/components/MessageContent";
import { useUserInfoContext } from "../../frontend/contexts/UserInfoContext";
import { editedMessage, ownedByUser } from "../../frontend/utils/messages";

jest.mock("../../frontend/contexts/UserInfoContext", () => ({
  useUserInfoContext: jest.fn(),
}));

jest.mock("../../frontend/utils/messages", () => ({
  editedMessage: jest.fn(),
  ownedByUser: jest.fn(),
}));

describe("MessageContent", () => {
  it("displays message body", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    editedMessage.mockReturnValue(false);
    ownedByUser.mockReturnValue(false);

    const testMessage = {
      body: "test message body",
      user: { id: 2 },
    };
    render(<MessageContent message={testMessage} />);
    expect(screen.queryByText("test message body")).not.toBeNull();
  });

  it("displays edited if edited", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    editedMessage.mockReturnValue(true);
    ownedByUser.mockReturnValue(false);

    const testMessage = {
      body: "test message body",
      user: { id: 2 },
    };
    render(<MessageContent message={testMessage} />);
    expect(screen.queryByText("edited")).not.toBeNull();
  });

  it("does not display edited if not edited", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    editedMessage.mockReturnValue(false);
    ownedByUser.mockReturnValue(false);

    const testMessage = {
      body: "test message body",
      user: { id: 2 },
    };
    render(<MessageContent message={testMessage} />);
    expect(screen.queryByText("edited")).toBeNull();
  });

  it("displays message sender username if not owned by user", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    editedMessage.mockReturnValue(false);
    ownedByUser.mockReturnValue(false);

    const testMessage = {
      body: "test message body",
      user: { id: 2, username: "message sender" },
    };
    render(<MessageContent message={testMessage} />);
    expect(screen.queryByText("message sender")).not.toBeNull();
  });

  it("does not display message sender username if owned by user", () => {
    useUserInfoContext.mockReturnValue({ id: 1 });
    editedMessage.mockReturnValue(false);
    ownedByUser.mockReturnValue(true);

    const testMessage = {
      body: "test message body",
      user: { id: 2, username: "message sender" },
    };
    render(<MessageContent message={testMessage} />);
    expect(screen.queryByText("message sender")).toBeNull();
  });
});
