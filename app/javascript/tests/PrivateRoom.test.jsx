import React from "react";
import { render, screen } from "@testing-library/react";
import PrivateRoom from "../components/PrivateRoom";

describe("PrivateRoom", () => {
  it("displays name of other user in chat", () => {
    const testRoom = { name: "pc_ernest_hemingway" };
    const testUser = { username: "ernest" };
    const mockCallback = jest.fn();
    render(
      <PrivateRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        notifications={[]}
        setNotifications={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );
    expect(screen.queryByText(/hemingway/i)).not.toBeNull();
  });

  it("displays the number of notifications", () => {
    const testRoom = { id: 1, name: "pc_ernest_hemingway", is_private: true };
    const testUser = { username: "ernest" };
    const mockCallback = jest.fn();
    const testNotifications = [{ room_id: 1 }, { room_id: 1 }];
    render(
      <PrivateRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        notifications={testNotifications}
        setNotifications={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );
    expect(screen.queryByText(/2/i)).not.toBeNull();
  });

  it("displays a delete button", () => {
    const testRoom = { name: "pc_ernest_hemingway" };
    const testUser = { username: "ernest" };
    const mockCallback = jest.fn();
    render(
      <PrivateRoom
        user={testUser}
        room={testRoom}
        currentRoom={null}
        setCurrentRoom={mockCallback}
        setViewPeople={mockCallback}
        notifications={[]}
        setNotifications={mockCallback}
        rooms={[]}
        setRooms={mockCallback}
      />
    );
    expect(screen.queryByLabelText("delete")).not.toBeNull();
  });
});
