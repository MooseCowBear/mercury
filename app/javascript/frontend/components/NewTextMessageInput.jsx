import React from "react";

// TODO: add state
// IF not current room, then disable

export default function NewTextMessageInput() {
  return (
    <input
      className="border py-1 px-5 rounded-full text-sm"
      placeholder="what's on your mind..."
    />
  );
}
