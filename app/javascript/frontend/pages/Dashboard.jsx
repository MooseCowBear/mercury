import React, { useEffect, useState } from "react";
import ChatMain from "../layout/ChatMain.jsx";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import PeopleSidebar from "../layout/PeopleSidebar.jsx";
import { useWindowResize } from "../hooks/useWindowResize.jsx";
import { CurrentChatProvider } from "../contexts/CurrentChatContext.jsx";

const MOBILE_LAYOUT_BREAKPOINT = 768;

export default function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState({
    chats: window.innerWidth > MOBILE_LAYOUT_BREAKPOINT ? true : false,
    people: false,
  });

  const [messageVisible, setMessageVisible] = useState(true);

  useWindowResize(
    MOBILE_LAYOUT_BREAKPOINT,
    setMessageVisible,
    setSidebarVisible
  );

  return (
    <CurrentChatProvider>
      <div className="grid grid-cols-1 grid-rows-[1fr,_auto] xs:grid-cols-[auto,_1fr] md:grid-cols-[auto,_1fr,_2fr] xs:grid-rows-1 gap-2 h-full">
        <Menu
          setMessageVisibility={setMessageVisible}
          setSidebarVisibility={setSidebarVisible}
        />
        <ChatSidebar visible={sidebarVisible.chats} />
        <PeopleSidebar visible={sidebarVisible.people} />
        <ChatMain visible={messageVisible} />
      </div>
    </CurrentChatProvider>
  );
}

// NOTE: not ideal in terms of re-rendering...
