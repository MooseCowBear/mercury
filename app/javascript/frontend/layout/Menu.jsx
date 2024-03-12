import React from "react";
import FeatherIcon from "../icons/FeatherIcon";
import CommentIcon from "../icons/CommentIcon";
import PeopleIcon from "../icons/PeopleIcon";
import AccountIcon from "../icons/AccountIcon";

/* for large screens: messages are always visible, chat button shows chats 
and people button shows people. for small screens, 
 */

export default function Menu({ setVisibility }) {
  const smallScreenChatHandler = () => {
    setVisibility((val) => {
      if (val.messages) {
        return { messages: false, chats: true, people: false };
      } else {
        return { messages: true, chats: false, people: false };
      }
    });
  };

  const chatClickhandler = () => {
    setVisibility((val) => {
      const data = { ...val };
      data.chats = true;
      data.people = false;
      return data;
    });
  };

  const smallScreenPeopleHandler = () => {
    setVisibility({ messages: false, chats: false, people: true });
  };

  const peopleClickhandler = () => {
    setVisibility((val) => {
      const data = { ...val };
      data.chats = false;
      data.people = true;
      return data;
    });
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
