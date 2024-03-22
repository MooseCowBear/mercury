import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewPrivateChatForm from "../../frontend/components/NewPrivateChatForm";
import { renderWithContexts } from "../contextWrapper";
import { postResource2 } from "../../frontend/utils/apiRequest";

jest.mock("../../frontend/utils/apiRequest", () => ({
  postResource2: jest.fn(),
}));

jest.mock("../../frontend/components/SelectedPerson", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-selected-person" />;
  },
}));

describe("NewPrivateChatForm", () => {
  it("has a submit button", () => {
    const selectedPeople = [];
    const setSelectedPeople = jest.fn();
    renderWithContexts(
      <NewPrivateChatForm
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />,
      [
        {
          context: "UserInfoContext",
          contextValue: { userInfo: true, setUserInfo: jest.fn() },
        },
        {
          context: "VisibilityContext",
          contextValue: { visibility: { people: true } },
        },
        {
          context: "PrivateChatsContext",
          contextValue: { setPrivateChats: jest.fn() },
        },
      ]
    );

    expect(screen.queryByLabelText("create chat")).not.toBeNull();
  });

  it("renders a selected person for each selected person", () => {
    const selectedPeople = [
      { id: 1, username: "one" },
      { id: 2, username: "two" },
    ];
    const setSelectedPeople = jest.fn();
    renderWithContexts(
      <NewPrivateChatForm
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />,
      [
        {
          context: "UserInfoContext",
          contextValue: { userInfo: true, setUserInfo: jest.fn() },
        },
        {
          context: "VisibilityContext",
          contextValue: { visibility: { people: true } },
        },
        {
          context: "PrivateChatsContext",
          contextValue: { setPrivateChats: jest.fn() },
        },
      ]
    );

    expect(screen.queryAllByTestId("mock-selected-person").length).toBe(2);
  });

  it("submits a post request when submit button clicked", async () => {
    postResource2.mockReturnValue(Promise.resolve());
    const selectedPeople = [
      { id: 1, username: "one" },
      { id: 2, username: "two" },
    ];
    const setSelectedPeople = jest.fn();
    const user = userEvent.setup();

    renderWithContexts(
      <NewPrivateChatForm
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />,
      [
        {
          context: "UserInfoContext",
          contextValue: { userInfo: true, setUserInfo: jest.fn() },
        },
        {
          context: "VisibilityContext",
          contextValue: { visibility: { people: true } },
        },
        {
          context: "PrivateChatsContext",
          contextValue: { setPrivateChats: jest.fn() },
        },
      ]
    );

    await user.click(screen.getByLabelText("create chat"));
    expect(postResource2.mock.calls.length).toBe(1);
  });
});

