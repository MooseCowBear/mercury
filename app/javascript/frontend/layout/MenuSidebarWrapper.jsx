import React, { useState } from "react";
import Menu from "./Menu";
import ChatSidebar from "./ChatSidebar";

// so won't have to redraw messages component just because we opened and closed the chat side bar on mobile
export default function MenuSidebarWrapper() {
  const [expandSidebar, setExpandSidebar] = useState(false);
  return (
    <>
      <Menu setSidebarState={setExpandSidebar}/>
      <ChatSidebar expanded={expandSidebar}/>
    </>
  );
}
