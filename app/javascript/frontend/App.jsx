import React from "react";
import Router from "../routes/index.jsx";
import { ActionCableProvider } from "./contexts/ActionCableContext.jsx";
import { UserInfoProvider } from "./contexts/UserInfoContext.jsx";
import { PrivateChatsProvider } from "./contexts/PrivateChatsContext.jsx";
import { PublicChatsProvider } from "./contexts/PublicChatsContext.jsx";
import { VisibilityProvider } from "./contexts/VisibilityContext.jsx";

export default App = () => {
  return (
    <ActionCableProvider>
      <UserInfoProvider>
        <PrivateChatsProvider>
          <PublicChatsProvider>
            <VisibilityProvider>
              <Router />
            </VisibilityProvider>
          </PublicChatsProvider>
        </PrivateChatsProvider>
      </UserInfoProvider>
    </ActionCableProvider>
  );
};
