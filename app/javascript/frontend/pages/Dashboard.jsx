import React, { useEffect, useState } from "react";
import ChatMain from "../layout/ChatMain.jsx";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import PeopleSidebar from "../layout/PeopleSidebar.jsx";
import { useWindowResize } from "../hooks/useWindowResize.js";
import { UserInfoProvider } from "../contexts/UserInfoContext.jsx";
import { ActionCableProvider } from "../contexts/ActionCableContext.jsx";

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

  // could switch to grid rows (1fr auto auto) for mobile and then set the class to "collapse" instead of hidden...
  return (
    <UserInfoProvider>
      <ActionCableProvider>
        <div className="h-[calc(100vh-100px)] grid grid-cols-1 grid-rows-[1fr,_auto] xs:grid-cols-[auto,_1fr] md:grid-cols-[auto,_1fr,_2fr] xs:grid-rows-1 gap-2">
          <Menu
            setMessageVisibility={setMessageVisible}
            setSidebarVisibility={setSidebarVisible}
          />
          <ChatSidebar visible={sidebarVisible.chats} />
          <PeopleSidebar visible={sidebarVisible.people} />

          <ChatMain visible={messageVisible} />
        </div>
      </ActionCableProvider>
    </UserInfoProvider>
  );
}

// NOTE: not ideal in terms of re-rendering...
