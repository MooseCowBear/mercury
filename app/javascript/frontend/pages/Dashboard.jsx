import React, { useEffect, useRef } from "react";
import ChatMain from "../layout/ChatMain.jsx";
import Menu from "../layout/Menu.jsx";
import ChatSidebar from "../layout/ChatSidebar.jsx";
import PeopleSidebar from "../layout/PeopleSidebar.jsx";
import { useVisibilityContext } from "../contexts/VisibilityContext.jsx";
import { useActionCableContext } from "../contexts/ActionCableContext.jsx";
import { useUserInfoContext } from "../contexts/UserInfoContext.jsx";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext.jsx";
import { usePublicChatsContext } from "../contexts/PublicChatsContext.jsx";
import { useChatSubscriptions } from "../hooks/useChatsSubscriptions.js";

/* dashboard subscribes to the private, public chat channels. these are channels
that listen for new chats being created/existing chats being updated. 
in order to have a chat appear to creator when chat is created, but
not appearing to others until a message is created, need to update chats on front end for 
creator from chat#create json response
*/

export default function Dashboard() {
  const { cable } = useActionCableContext();
  const { userID } = useUserInfoContext();
  const { setPrivateChats } = usePrivateChatsContext();
  const { setPublicChats } = usePublicChatsContext();
  const { visibility } = useVisibilityContext();

  useChatSubscriptions(cable, userID, setPrivateChats, setPublicChats);

  return (
    <div className="h-[calc(100vh-100px)] grid grid-cols-1 grid-rows-[1fr,_auto] xs:grid-cols-[auto,_1fr] md:grid-cols-[auto,_310px,_2fr] xs:grid-rows-1 gap-2">
      <Menu />
      {visibility.chats && <ChatSidebar />}
      {visibility.people && <PeopleSidebar />}
      <ChatMain />
    </div>
  );
}
