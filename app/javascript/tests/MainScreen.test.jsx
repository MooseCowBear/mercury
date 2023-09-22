import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MainScreen from "../components/MainScreen";
import { makeGetRequest, makeMultiGetRequest } from "../helpers/apiRequest";

// why does this not seem to be working?
jest.mock("../helpers/useActionCable", () => {
  const originalModule = jest.requireActual("../helpers/useActionCable");

  return {
    __esModule: true,
    ...originalModule,
    useActionCable: jest.fn(),
  };
});

jest.mock("../helpers/apiRequest", () => ({
  makeMultiGetRequest: jest.fn(),
  makeGetRequest: jest.fn(),
}));

jest.mock("../components/SideBar", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="sidebar" />;
  },
}));

jest.mock("../components/People", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="people" />;
  },
}));

jest.mock("../components/ChatMessages", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="chat-messages" />;
  },
}));

jest.mock("../components/Welcome", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="welcome" />;
  },
}));

describe("MainScreen", () => {
  it("defaults to rendering Welcome component", async () => {
    makeMultiGetRequest.mockReturnValueOnce(
      Promise.resolve([
        { id: 1, username: "user1" },
        [{ id: 1, name: "room1" }],
      ])
    );

    makeGetRequest.mockReturnValueOnce(
      Promise.resolve([{ id: 1, name: "pc_user1_user2" }])
    );

    render(<MainScreen />);

    waitFor(() => {
      screen.getByTestId("welcome");
    });
  });

  it("displays user name after user fetch", () => {
    makeMultiGetRequest.mockReturnValueOnce(
      Promise.resolve([
        { id: 1, username: "user1" },
        [{ id: 1, name: "room1" }],
      ])
    );

    makeGetRequest.mockReturnValueOnce(
      Promise.resolve([{ id: 1, name: "pc_user1_user2" }])
    );

    render(<MainScreen />);

    waitFor(() => {
      screen.getByText(/user1/i);
    });
  });

  it("renders SideBar compoennt", () => {
    makeMultiGetRequest.mockReturnValueOnce(
      Promise.resolve([
        { id: 1, username: "user1" },
        [{ id: 1, name: "room1" }],
      ])
    );

    makeGetRequest.mockReturnValueOnce(
      Promise.resolve([{ id: 1, name: "pc_user1_user2" }])
    );

    render(<MainScreen />);

    waitFor(() => {
      screen.getByTestId("sidebar");
    });
  });

  it("renders error when fetch fails", () => {
    makeMultiGetRequest.mockReturnValueOnce(Promise.reject(new Error("error")));

    makeGetRequest.mockReturnValueOnce(
      Promise.resolve([{ id: 1, name: "pc_user1_user2" }])
    );

    render(<MainScreen />);

    waitFor(() => {
      screen.getByText(/wrong/i);
    });
  });
});
