import React from "react";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import ChatContainer from "../layout/ChatContainer.jsx";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[auto,_1fr,_3fr] grid-rows-1 gap-2 h-full">
      <Menu />
      <ChatSidebar />
      <ChatContainer />
    </div>
  );
}

// TODO: will contain the side bar(s)
