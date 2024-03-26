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
  const { visibility, chatVisibilityHandler, peopleVisibilityHandler } =
    useVisibilityContext();

  const chatButtonLabel = !visibility.messages
    ? "view chat messages"
    : "view chats";

  return (
    <div className="flex row-start-2 xs:row-start-1 xs:flex-col justify-between items-center bg-neutral-800 rounded-xl p-5 shadow dark:bg-neutral-700/90">
      <FeatherIcon />
      <div className="flex xs:flex-col gap-3">
        <button
          id="chat-button"
          aria-label={chatButtonLabel}
          onClick={chatVisibilityHandler}
        >
          <CommentIcon />
        </button>
        <button
          id="people-button"
          aria-label="find people"
          onClick={peopleVisibilityHandler}
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
