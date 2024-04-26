import React from "react";
import Send from "../icons/Send";

export default function SendMessageButton({ submitHandler, disable = false }) {
  return (
    <button aria-label="send" onClick={submitHandler} disabled={disable}>
      <Send />
    </button>
  );
}
