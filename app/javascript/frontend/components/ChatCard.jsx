import React from "react";

export default function ChatCard({ chat, isPrivate }) {
  // won't need isPrivate, just for working out ui
  return (
    <button className="w-full flex justify-between items-center py-2">
      <div className="grid grid-col-[auto,_1fr] grid-rows-2 gap-x-2 items-center">
        <div className="size-10 rounded-full row-span-2 bg-neutral-800"></div>
        <h4 className="text-sm font-medium col-start-2 text-left">
          name placeholder
        </h4>
        <p className="text-xs text-neutral-500 col-start-2 text-left">
          message preview placeholder...
        </p>
      </div>
      {isPrivate && (
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs">10:35</p>
          <div className="flex items-center justify-center rounded-full size-6 bg-poppy-500 text-white text-sm">
            3
          </div>
        </div>
      )}
    </button>
  );
}
