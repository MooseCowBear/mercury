import React, { useState } from "react";
import ChatMain from "../layout/ChatMain.jsx";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import PeopleSidebar from "../layout/PeopleSidebar.jsx";

export default function Dashboard() {
  const [sidebarVisibility, setSidebarVisibility] = useState({
    chats: true,
    people: false,
  });

  const [messageVisibility, setMessageVisibility] = useState(true);

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr,_auto] xs:grid-cols-[auto,_1fr] md:grid-cols-[auto,_1fr,_2fr] xs:grid-rows-1 gap-2 h-full">
      <Menu
        setMessageVisibility={setMessageVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
      {sidebarVisibility.chats && <ChatSidebar />}
      {sidebarVisibility.people && <PeopleSidebar />}
      {messageVisibility && <ChatMain />}
    </div>
  );
}

// TODO: need a window size listener to make sure messages is set to visible when screen moves from large to small
// and chats/people are not visible
// when window moves from small to large, make messages visible IF NOT, leave chats/people state as is
// but IF messages IS already visible, make chats visible (that will be the default)
