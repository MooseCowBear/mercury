import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import EditMessageForm from "../../frontend/components/EditMessageForm";
import { renderWithContexts } from "../contextWrapper";
import { postResource } from "../../frontend/utils/apiRequest";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource: jest.fn(),
}));

describe("EditMessageForm", () => {
  it("displays error if attempt to submit message without content", async () => {
    const user = userEvent.setup();
    const testMessage = { body: "test" };
    const mockHandler = jest.fn();
    renderWithContexts(
      <EditMessageForm message={testMessage} setEditing={mockHandler} />,
      [
        {
          context: "UserInfoContext",
          contextValue: { userInfo: { current_chat_id: 1 } },
        },
      ]
    );

    await user.clear(screen.getByLabelText("edit message"));
    await user.click(document.body);
    expect(screen.queryByText("Message must have content.")).not.toBeNull();
  });

  it("updates input", async () => {
    const user = userEvent.setup();
    const testMessage = { body: "test" };
    const mockHandler = jest.fn();
    renderWithContexts(
      <EditMessageForm message={testMessage} setEditing={mockHandler} />,
      [
        {
          context: "UserInfoContext",
          contextValue: { userInfo: { current_chat_id: 1 } },
        },
      ]
    );

    await user.type(screen.getByLabelText("edit message"), "something");
    expect(screen.queryByDisplayValue("testsomething")).not.toBeNull();
  });

  it("makes post request on submit", async () => {
    postResource.mockReturnValue(Promise.resolve([]));

    const user = userEvent.setup();
    const testMessage = { body: "test" };
    const mockHandler = jest.fn();
    renderWithContexts(
      <EditMessageForm message={testMessage} setEditing={mockHandler} />,
      [
        {
          context: "UserInfoContext",
          contextValue: { userInfo: { current_chat_id: 1 } },
        },
      ]
    );

    await user.type(screen.getByLabelText("edit message"), "something");
    await user.click(document.body);
    expect(postResource.mock.calls.length).toBe(1);
  });
});
