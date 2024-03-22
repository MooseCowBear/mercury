import React, { createContext, useContext } from "react";
import { useUserInfo } from "../hooks/useUserInfo";

export const UserInfoContext = createContext(null);

export function useUserInfoContext() {
  const value = useContext(UserInfoContext);
  if (value === null) throw Error("Can't be used outside ContextProvider");
  return value;
}

export function UserInfoProvider({ children }) {
  const { userInfo, setUserInfo } = useUserInfo();

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
