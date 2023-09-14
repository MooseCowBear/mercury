import React from "react";

export default Welcome = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-11/12 h-5/6">
      <h1 className="text-6xl font-semibold">Welcome!</h1>
      <p>Choose from an existing chat, or create a new one.</p>
    </div>
  );
};