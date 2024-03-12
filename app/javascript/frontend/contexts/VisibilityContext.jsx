import React, { createContext, useContext, useState } from "react";
import { useWindowResize } from "../hooks/useWindowResize";

const VisibilityContext = createContext(null);

const MOBILE_LAYOUT_BREAKPOINT = 768;

export function useVisibilityContext() {
  const value = useContext(VisibilityContext);
  if (value === null) throw Error("Can't be used outside ContextProvider");
  return value;
}

export function VisibilityProvider({ children }) {
  const [visibility, setVisibility] = useState({
    messages: true,
    chats: window.innerWidth > MOBILE_LAYOUT_BREAKPOINT ? true : false,
    people: false,
  });

  useWindowResize(MOBILE_LAYOUT_BREAKPOINT, setVisibility);

  const smallScreenChatHandler = () => {
    setVisibility((val) => {
      if (val.messages) {
        return { messages: false, chats: true, people: false };
      } else {
        return { messages: true, chats: false, people: false };
      }
    });
  };

  const chatClickhandler = () => {
    setVisibility((val) => {
      const data = { ...val };
      data.chats = true;
      data.people = false;
      return data;
    });
  };

  const smallScreenPeopleHandler = () => {
    setVisibility({ messages: false, chats: false, people: true });
  };

  const peopleClickhandler = () => {
    setVisibility((val) => {
      const data = { ...val };
      data.chats = false;
      data.people = true;
      return data;
    });
  };
  return (
    <VisibilityContext.Provider
      value={{
        visibility,
        setVisibility,
        smallScreenChatHandler,
        smallScreenPeopleHandler,
        chatClickhandler,
        peopleClickhandler,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}
