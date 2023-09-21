import React from "react";
import { render, screen } from "@testing-library/react";
import PublicRooms from "../components/PublicRooms";

jest.mock("../components/NewRoomForm", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="new-form" />;
  },
}));

jest.mock("../components/PublicRoom", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="public-room" />;
  },
}));

describe("PublicRooms", () => {
  it("renders NewRoomForm", () => {
    const mockCallback = jest.fn();

    render(
      <PublicRooms
        user={null}
        rooms={[]}
        setRooms={mockCallback}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
      />
    );

    expect(screen.queryByTestId("new-form")).not.toBeNull();
  });

  it("render public room for each room", () => {
    const mockCallback = jest.fn();

    render(
      <PublicRooms
        user={null}
        rooms={[{ id: 1, name: "test" }]}
        setRooms={mockCallback}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
      />
    );

    expect(screen.queryByTestId("public-room")).not.toBeNull();
  });
});
