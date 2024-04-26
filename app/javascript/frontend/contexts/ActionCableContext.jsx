import React, { createContext, useContext } from "react";
import { useActionCable } from "../hooks/useActionCable";

export const ActionCableContext = createContext(null);

export function useActionCableContext() {
  const value = useContext(ActionCableContext);
  if (value === null) throw Error("Can't be used outside ContextProvider");
  return value;
}

export function ActionCableProvider({ children }) {
  const cable = useActionCable();
  return (
    <ActionCableContext.Provider value={{ cable }}>
      {children}
    </ActionCableContext.Provider>
  );
}
