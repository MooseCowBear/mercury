import React from "react";
import ChatMain from "../layout/ChatMain.jsx";
import MenuSidebarWrapper from "../layout/MenuSidebarWrapper.jsx";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr,_auto] xs:grid-cols-[auto,_1fr] md:grid-cols-[auto,_1fr,_3fr] xs:grid-rows-1 gap-2 h-full">
      <MenuSidebarWrapper />
      <ChatMain />
    </div>
  );
}
