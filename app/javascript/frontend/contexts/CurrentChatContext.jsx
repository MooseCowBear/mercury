import React, { createContext, useContext } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

const CurrentChatContext = createContext(null);

export function useCurrentChatContext() {
  const value = useContext(CurrentChatContext);
  if (value === null) throw Error("Can't be used outside BlogContextProvider");
  return value;
}

export function CurrentChatProvider({ children }) {
  const { currUser, currChat, setCurrChat } = useCurrentUser();

  return (
    <CurrentChatContext.Provider value={{ currUser, currChat, setCurrChat }}>
      {children}
    </CurrentChatContext.Provider>
  );
}
