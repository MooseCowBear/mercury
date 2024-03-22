import React, { createContext, useContext } from "react";
import { usePublicChats } from "../hooks/usePublicChats";

export const PublicChatsContext = createContext(null);

export function usePublicChatsContext() {
  const value = useContext(PublicChatsContext);
  if (value === null) throw Error("Can't be used outside ContextProvider");
  return value;
}

export function PublicChatsProvider({ children }) {
  const { publicChats, setPublicChats } = usePublicChats();

  return (
    <PublicChatsContext.Provider value={{ publicChats, setPublicChats }}>
      {children}
    </PublicChatsContext.Provider>
  );
}
