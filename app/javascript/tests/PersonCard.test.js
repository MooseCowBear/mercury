import React from "react";
import { render, screen } from "@testing-library/react";
import PersonCard from "../components/PersonCard";

describe("PersonCard", () => {
  it("displays person's username", () => {
    const mockCallback = jest.fn();
    const mockPerson = { username: "paul", last_active: new Date() };
    render(
      <PersonCard
        person={mockPerson}
        setCurrentRoom={mockCallback}
        setError={mockCallback}
        setViewPeople={mockCallback}
      />
    );

    expect(screen.getByRole("heading").textContent).toMatch(/paul/i);
  });

  it("renders a send message button", () => {
    const mockCallback = jest.fn();
    const mockPerson = { username: "paul", last_active: new Date() };
    render(
      <PersonCard
        person={mockPerson}
        setCurrentRoom={mockCallback}
        setError={mockCallback}
        setViewPeople={mockCallback}
      />
    );

    expect(screen.getByRole("button").textContent).toMatch(/message/i);
  });

  it("indicates person is active if active", () => {
    const mockCallback = jest.fn();
    const mockPerson = { username: "paul", last_active: new Date() };
    render(
      <PersonCard
        person={mockPerson}
        setCurrentRoom={mockCallback}
        setError={mockCallback}
        setViewPeople={mockCallback}
      />
    );

     expect(screen.queryByText(/active/i)).not.toBeNull(); 
  });

  it("does not indicate person is active if inactive", () => {
    const mockCallback = jest.fn();
    const now = new Date();
    const testTime = new Date(now.getTime() - (10 * 60000 + 1));
    const mockPerson = { username: "paul", last_active: testTime };
    render(
      <PersonCard
        person={mockPerson}
        setCurrentRoom={mockCallback}
        setError={mockCallback}
        setViewPeople={mockCallback}
      />
    );

    expect(screen.queryByText(/active/i)).toBeNull(); 
  });

  
});
