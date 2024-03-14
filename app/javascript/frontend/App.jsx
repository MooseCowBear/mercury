import React from "react";
import Router from "../routes/index.jsx";
import { ActionCableProvider } from "./contexts/ActionCableContext.jsx";
import { UserInfoProvider } from "./contexts/UserInfoContext.jsx";
import { PrivateChatsProvider } from "./contexts/PrivateChatsContext.jsx";
import { PublicChatsProvider } from "./contexts/PublicChatsContext.jsx";

export default App = () => {
  return (
    <ActionCableProvider>
      <UserInfoProvider>
        <PrivateChatsProvider>
          <PublicChatsProvider>
            <Router />
          </PublicChatsProvider>
        </PrivateChatsProvider>
      </UserInfoProvider>
    </ActionCableProvider>
  );
};

// TRY: moving action cable provider here so dashboard has access
