import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PublicRoom from "../components/PublicRoom";

jest.mock("../components/UpdateRoomForm", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="update-form" />;
  },
}));

describe("PublicRoom", () => {
  it("displays the room name", () => {
    const testRoom = { id: 1, name: "test", creator_id: 1 };
    const testUser = { id: 1, username: "frank" };
    const mockCallback = jest.fn();

    render(
      <PublicRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );

    expect(screen.queryByText(/test/i)).not.toBeNull();
  });

  it("displays button to edit if user created room", () => {
    const testRoom = { id: 1, name: "test", creator_id: 1 };
    const testUser = { id: 1, username: "frank" };
    const mockCallback = jest.fn();

    render(
      <PublicRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );

    expect(screen.queryByLabelText("edit")).not.toBeNull();
  });

  it("does not display edit button if user did not create room", () => {
    const testRoom = { id: 1, name: "test", creator_id: 1 };
    const testUser = { id: 2, username: "frank" };
    const mockCallback = jest.fn();

    render(
      <PublicRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );

    expect(screen.queryByLabelText("edit")).toBeNull();
  });

  it("does not display UpdateRoomForm if editing state is false", () => {
    const testRoom = { id: 1, name: "test", creator_id: 1 };
    const testUser = { id: 1, username: "frank" };
    const mockCallback = jest.fn();

    render(
      <PublicRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );

    expect(screen.queryByTestId("update-form")).toBeNull();
  });

  it("displays UpdateRoomForm if editing state is true", async () => {
    const user = userEvent.setup();
    const testRoom = { id: 1, name: "test", creator_id: 1 };
    const testUser = { id: 1, username: "frank" };
    const mockCallback = jest.fn();

    render(
      <PublicRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );

    const editBtn = screen.getByLabelText("edit");
    await user.click(editBtn);

    expect(screen.queryByTestId("update-form")).not.toBeNull();
  });
});
