import React from "react";

export default function SendMessageButton({ submitHandler }) {
  return (
    <button aria-label="send" onClick={submitHandler}>
      <svg
        className="size-6 fill-poppy-500 translate-y-[-1px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill="" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
      </svg>
    </button>
  );
}
