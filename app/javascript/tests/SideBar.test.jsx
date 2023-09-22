import React from "react";
import { render, screen } from "@testing-library/react";
import SideBar from "../components/SideBar";
import "@testing-library/jest-dom";

jest.mock("../helpers/apiRequest", () => ({
  makeGetRequest: jest.fn(),
}));

jest.mock("../components/PrivateChats", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="private-chats" />;
  },
}));

jest.mock("../components/PublicRooms", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="public-rooms" />;
  },
}));

describe("SideBar", () => {
  const mockCallback = jest.fn();

  it("displays each public room", () => {
    render(
      <SideBar
        user={null}
        rooms={[]}
        setRooms={mockCallback}
        currentRoom={null}
        privateChats={[]}
        setPrivateChats={mockCallback}
        setViewPeople={mockCallback}
        actionCable={null}
      />
    );

    expect(screen.queryByTestId("public-rooms")).not.toBeNull();
  });

  it("displays each private room", () => {
    render(
      <SideBar
        user={null}
        rooms={[]}
        setRooms={mockCallback}
        currentRoom={null}
        privateChats={[]}
        setPrivateChats={mockCallback}
        setViewPeople={mockCallback}
        actionCable={null}
      />
    );

    expect(screen.queryByTestId("private-chats")).not.toBeNull();
  });

  it("has button for home", () => {
    render(
      <SideBar
        user={null}
        rooms={[]}
        setRooms={mockCallback}
        currentRoom={null}
        privateChats={[]}
        setPrivateChats={mockCallback}
        setViewPeople={mockCallback}
        actionCable={null}
      />
    );

    expect(screen.queryByRole("button", { name: "Home" })).not.toBeNull();
  });

  it("has button for people", () => {
    render(
      <SideBar
        user={null}
        rooms={[]}
        setRooms={mockCallback}
        currentRoom={null}
        privateChats={[]}
        setPrivateChats={mockCallback}
        setViewPeople={mockCallback}
        actionCable={null}
      />
    );

    expect(screen.queryByRole("button", { name: "People" })).not.toBeNull();
  });

  it("has link to edit registration", () => {
    render(
      <SideBar
        user={null}
        rooms={[]}
        setRooms={mockCallback}
        currentRoom={null}
        privateChats={[]}
        setPrivateChats={mockCallback}
        setViewPeople={mockCallback}
        actionCable={null}
      />
    );

    expect(screen.queryByRole("link")).toHaveAttribute("href", "/users/edit");
  });
});
