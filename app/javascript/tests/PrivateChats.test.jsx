import React from "react";
import { render, screen } from "@testing-library/react";
import PrivateChats from "../components/PrivateChats";

jest.mock("../components/PrivateRoom", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="private-room" />;
  },
}));

describe("PrivateChats", () => {
  it("displays a PrivateRoom for each private chat", () => {
    const testPrivateChats = [{ id: 1, name: "one" }];
    const mockCallback = jest.fn();
    render(
      <PrivateChats
        user={null}
        privateChats={testPrivateChats}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        notifications={[]}
        setNotifications={mockCallback}
      />
    );

    expect(screen.queryByTestId("private-room")).not.toBeNull();
  });
});

