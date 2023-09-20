import React from "react";
import { render, screen } from "@testing-library/react";
import MessageContent from "../components/MessageContent";

describe("MessageContent", () => {
  it("displays message body", () => {
    const testMessage = { body: "this is a message" };
    render(<MessageContent message={testMessage} isOwner={false} />);

    expect(screen.queryByText(/this is a message/i)).not.toBeNull();
  });

  it("marks message as edited if edited", () => {
    const testUpdatedAt = new Date();
    const testCreatedAt = new Date(testUpdatedAt.getTime() - 1000);
    const testMessage = {
      body: "this is a message",
      created_at: testCreatedAt,
      updated_at: testUpdatedAt,
    };
    render(<MessageContent message={testMessage} isOwner={false} />);

    expect(screen.queryByText(/edited/i)).not.toBeNull();
  });

  it("does not mark message as edited if not edited", () => {
    const testDate = new Date();
    const testMessage = {
      body: "this is a message",
      created_at: testDate,
      updated_at: testDate,
    };
    render(<MessageContent message={testMessage} isOwner={false} />);

    expect(screen.queryByText(/edited/i)).toBeNull();
  });
});
