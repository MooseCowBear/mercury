import React from "react";
import Circle from "./Circle";

function GroupTwo() {
  return (
    <>
      <Circle
        classes={
          "size-5 fill-neutral-800 justify-self-end items-end translate-x-[1px] translate-y-[5px] dark:fill-neutral-100"
        }
      />
      <Circle
        classes={
          "size-4 fill-neutral-800 justify-self-center items-center translate-y-[15px] dark:fill-neutral-100"
        }
      />
    </>
  );
}

function GroupThree() {
  return (
    <>
      <Circle
        classes={
          "size-3 fill-neutral-800 justify-self-end self-center dark:fill-neutral-100"
        }
      />
      <Circle
        classes={
          "size-5 fill-neutral-800 justify-self-end self-end translate-y-1/2 dark:fill-neutral-100"
        }
      />
      <Circle
        classes={
          "row-span-2 size-4 fill-neutral-800 justify-self-center self-center dark:fill-neutral-100"
        }
      />
    </>
  );
}

function GroupFour() {
  return (
    <>
      <Circle
        classes={
          "size-2 fill-neutral-800 justify-self-center self-center dark:fill-neutral-100"
        }
      />
      <Circle
        classes={
          "size-5 fill-neutral-800 justify-self-end self-start translate-x-[-1px] translate-y-[3px] dark:fill-neutral-100"
        }
      />
      <Circle
        classes={
          "size-4 fill-neutral-800 justify-self-end translate-y-[-2px] dark:fill-neutral-100"
        }
      />

      <Circle
        classes={
          "size-3 fill-neutral-800 justify-self-start self-center dark:fill-neutral-100"
        }
      />
    </>
  );
}

function GroupFactory({ members }) {
  switch (members) {
    case 2:
      return <GroupTwo />;
    case 3:
      return <GroupThree />;
    default:
      return <GroupFour />;
  }
}

export default function Group({ members, blocked }) {
  return (
    <div
      className={`grid grid-cols-2 row-span-2 size-10 ${
        blocked && "opacity-50"
      }`}
    >
      <GroupFactory members={members} />
    </div>
  );
}
