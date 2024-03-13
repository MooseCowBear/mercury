import React, { createContext, useContext, useState } from "react";
import { useWindowResize } from "../hooks/useWindowResize";

const VisibilityContext = createContext(null);

const MOBILE_LAYOUT_BREAKPOINT = 768;

const desktop = () => window.innerWidth > MOBILE_LAYOUT_BREAKPOINT;

export function useVisibilityContext() {
  const value = useContext(VisibilityContext);
  if (value === null) throw Error("Can't be used outside ContextProvider");
  return value;
}

export function VisibilityProvider({ children }) {
  const [visibility, setVisibility] = useState({
    messages: true,
    chats: desktop(),
    people: false,
  });

  useWindowResize(MOBILE_LAYOUT_BREAKPOINT, setVisibility);

  const mobileChatVisibilityHandler = () => {
    setVisibility((val) => {
      if (val.messages) {
        return { messages: false, chats: true, people: false };
      } else {
        return { messages: true, chats: false, people: false };
      }
    });
  };

  const desktopChatVisibilityHandler = () => {
    setVisibility((val) => {
      const data = { ...val };
      data.chats = true;
      data.people = false;
      return data;
    });
  };

  const chatVisibilityHandler = () => {
    if (desktop()) {
      desktopChatVisibilityHandler();
    } else {
      mobileChatVisibilityHandler();
    }
  };

  const mobilePeopleVisibilityHandler = () => {
    setVisibility({ messages: false, chats: false, people: true });
  };

  const desktopPeopleVisibilityHandler = () => {
    setVisibility((val) => {
      const data = { ...val };
      data.chats = false;
      data.people = true;
      return data;
    });
  };

  const peopleVisibilityHandler = () => {
    if (desktop()) {
      desktopPeopleVisibilityHandler();
    } else {
      mobilePeopleVisibilityHandler();
    }
  };
  return (
    <VisibilityContext.Provider
      value={{
        visibility,
        setVisibility,
        chatVisibilityHandler,
        peopleVisibilityHandler,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}
