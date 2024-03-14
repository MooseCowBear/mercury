import React, { createContext, useContext } from "react";
import { usePrivateChats } from "../hooks/usePrivateChats";

const PrivateChatsContext = createContext(null);

export function usePrivateChatsContext() {
  const value = useContext(PrivateChatsContext);
  if (value === null) throw Error("Can't be used outside ContextProvider");
  return value;
}

export function PrivateChatsProvider({ children }) {
  const { privateChats, setPrivateChats } = usePrivateChats();

  return (
    <PrivateChatsContext.Provider value={{ privateChats, setPrivateChats }}>
      {children}
    </PrivateChatsContext.Provider>
  );
}
