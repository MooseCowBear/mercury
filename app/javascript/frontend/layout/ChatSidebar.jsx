import React, { useState } from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";

export default function ChatSidebar() {
  const [expand, setExpand] = useState(false); // on big screens does nothing on small screens should make it visible

  return (
    <div className="hidden grid-rows-[auto,_1fr] gap-2 md:grid">
      <Searchbar title="Chat" />
      <div className="bg-white rounded-xl shadow divide-y-[1px]">
        <ChatsContainer title="public" isPrivate={false} />
        <ChatsContainer title="private" isPrivate={true} />
      </div>
    </div>
  );
}
