import React from "react";
import FeatherIcon from "../icons/FeatherIcon";
import CommentIcon from "../icons/CommentIcon";
import PeopleIcon from "../icons/PeopleIcon";
import AccountIcon from "../icons/AccountIcon";

export default function Menu({ setSidebarVisibility, setMessageVisibility }) {
  const smallScreenChatHandler = () => {
    setSidebarVisibility({ chats: true, people: false });
    setMessageVisibility(false);
  };

  const chatClickhandler = () => {
    setSidebarVisibility({ chats: true, people: false });
  };

  const smallScreenPeopleHandler = () => {
    setSidebarVisibility({ chats: false, people: true });
    setMessageVisibility(false);
  };

  const peopleClickhandler = () => {
    setSidebarVisibility({ chats: false, people: true });
  };

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
