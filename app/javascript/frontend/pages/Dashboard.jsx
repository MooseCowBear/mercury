import React from "react";
import ChatMain from "../layout/ChatMain.jsx";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import PeopleSidebar from "../layout/PeopleSidebar.jsx";
import { UserInfoProvider } from "../contexts/UserInfoContext.jsx";
import { ActionCableProvider } from "../contexts/ActionCableContext.jsx";
import { VisibilityProvider } from "../contexts/VisibilityContext.jsx";

export default function Dashboard() {
  return (
    <UserInfoProvider>
      <ActionCableProvider>
        <VisibilityProvider>
          <div className="h-[calc(100vh-100px)] grid grid-cols-1 grid-rows-[1fr,_auto] xs:grid-cols-[auto,_1fr] md:grid-cols-[auto,_1fr,_2fr] xs:grid-rows-1 gap-2">
            <Menu />
            <ChatSidebar />
            <PeopleSidebar />
            <ChatMain />
          </div>
        </VisibilityProvider>
      </ActionCableProvider>
    </UserInfoProvider>
  );
}
