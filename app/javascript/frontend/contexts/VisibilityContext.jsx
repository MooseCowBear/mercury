import React, { createContext, useContext, useState } from "react";
import { useWindowResize } from "../hooks/useWindowResize";

export const VisibilityContext = createContext(null);

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
    // toggles so always re-renders
    setVisibility((val) => {
      if (val.messages) {
        return { messages: false, chats: true, people: false };
      } else {
        return { messages: true, chats: false, people: false };
      }
    });
  };

  const desktopChatVisibilityHandler = () => {
    // check if need to change to prevent unnecessary re-renders
    if (!visibility.chats || visibility.people) {
      setVisibility((val) => {
        const data = { ...val };
        data.chats = true;
        data.people = false;
        return data;
      });
    }
  };

  const mobilePeopleVisibilityHandler = () => {
    // check if need to change to prevent unnecessary re-renders
    if (!visibility.people) {
      setVisibility({ messages: false, chats: false, people: true });
    }
  };

  const desktopPeopleVisibilityHandler = () => {
    // check if need to change to prevent unnecessary re-renders
    if (visibility.chats || !visibility.people) {
      setVisibility((val) => {
        const data = { ...val };
        data.chats = false;
        data.people = true;
        return data;
      });
    }
  };

  const chatVisibilityHandler = () => {
    if (desktop()) {
      desktopChatVisibilityHandler();
    } else {
      mobileChatVisibilityHandler();
    }
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
