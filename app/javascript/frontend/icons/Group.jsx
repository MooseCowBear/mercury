import React from "react";
import Circle from "./Circle";

function GroupTwo() {
  return (
    <div className="grid grid-cols-2 row-span-2 size-10">
      <Circle
        classes={
          "size-5 fill-neutral-800 justify-self-end items-end translate-x-[1px] translate-y-[5px]"
        }
      />
      <Circle
        classes={
          "size-4 fill-neutral-800 justify-self-center items-center translate-y-[15px]"
        }
      />
    </div>
  );
}

function GroupThree() {
  return (
    <div className="grid grid-cols-2 row-span-2 size-10">
      <Circle
        classes={"size-3 fill-neutral-800 justify-self-end self-center"}
      />
      <Circle
        classes={
          "size-5 fill-neutral-800 justify-self-end self-end translate-y-1/2"
        }
      />
      <Circle
        classes={
          "row-span-2 size-4 fill-neutral-800 justify-self-center self-center"
        }
      />
    </div>
  );
}

function GroupFour() {
  return (
    <div className="grid grid-cols-2 row-span-2 size-10">
      <Circle
        classes={"size-2 fill-neutral-800 justify-self-center self-center"}
      />
      <Circle
        classes={
          "size-5 fill-neutral-800 justify-self-end self-start translate-x-[-1px] translate-y-[3px]"
        }
      />
      <Circle
        classes={"size-4 fill-neutral-800 justify-self-end translate-y-[-2px]"}
      />

      <Circle
        classes={"size-3 fill-neutral-800 justify-self-start self-center"}
      />
    </div>
  );
}

export default function Group({ members }) {
  switch (members) {
    case 2:
      return <GroupTwo />;
    case 3:
      return <GroupThree />;
    default:
      return <GroupFour />;
  }
}
