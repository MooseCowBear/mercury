import React from "react";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import ChatMain from "../layout/ChatMain.jsx";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[auto,_1fr,_3fr] grid-rows-1 gap-2 h-full">
      <Menu />
      <ChatSidebar />
      <ChatMain />
    </div>
  );
}
