import React from "react";
import FeatherIcon from "../icons/FeatherIcon";
import CommentIcon from "../icons/CommentIcon";
import PeopleIcon from "../icons/PeopleIcon";
import AccountIcon from "../icons/AccountIcon";
import { useVisibilityContext } from "../contexts/VisibilityContext";

/* for large screens: messages are always visible, chat button shows chats 
and people button shows people. for small screens, default start position is messages
visible, people and chats hidden. 
 */

export default function Menu() {
  const {
    smallScreenChatHandler,
    smallScreenPeopleHandler,
    chatClickhandler,
    peopleClickhandler,
  } = useVisibilityContext();

  return (
    <div className="flex row-start-2 xs:row-start-1 xs:flex-col justify-between items-center bg-neutral-800 rounded-xl p-5 shadow">
      <FeatherIcon />
      <div className="flex xs:flex-col gap-3">
        <button
          aria-label="view chats"
          onClick={chatClickhandler}
          className="hidden md:block"
        >
          <CommentIcon />
        </button>
        <button
          aria-label="go to chat"
          onClick={smallScreenChatHandler}
          className="block md:hidden"
        >
          <CommentIcon />
        </button>
        <button
          aria-label="find people"
          onClick={peopleClickhandler}
          className="hidden md:block"
        >
          <PeopleIcon />
        </button>
        <button
          aria-label="find people"
          onClick={smallScreenPeopleHandler}
          className="block md:hidden"
        >
          <PeopleIcon />
        </button>
      </div>
      <a href="/users/edit" aria-label="account">
        <AccountIcon />
      </a>
    </div>
  );
}
