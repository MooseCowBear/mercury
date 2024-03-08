import React from "react";
import FeatherIcon from "../icons/FeatherIcon";
import CommentIcon from "../icons/CommentIcon";
import PeopleIcon from "../icons/PeopleIcon";
import AccountIcon from "../icons/AccountIcon";

export default function Menu({ setSidebarState }) {
  // want to make comment bubble toggle the visibility of the chats on small screens
  // on large screens it should be trading out the main message space...
  // people search icon should swap out the main message space with people

  const chatClickhandler = () => {
    setSidebarState((curr) => !curr);
    // show current chat room or welcome screen if none
  };

  const peopleClickhandler = () => {
    setSidebarState(false); // make sure chat sidebar is not visible
    // show people component instead of curr chat
  };

  return (
    <div className="flex row-start-2 xs:row-start-1 xs:flex-col justify-between items-center bg-neutral-800 rounded-xl p-5 shadow">
      <FeatherIcon />
      <div className="flex xs:flex-col gap-3">
        <button aria-label="chats" onClick={chatClickhandler}>
          <CommentIcon />
        </button>
        <button aria-label="find people" onClick={peopleClickhandler}>
          <PeopleIcon />
        </button>
      </div>
      <button aria-label="account">
        <AccountIcon />
      </button>
    </div>
  );
}
