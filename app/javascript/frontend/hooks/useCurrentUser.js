import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

/* hook used to fetch the currently signed in user, provided by context to the 
components that care about either the user or the current chat. 
*/

export const useCurrentUser = () => {
  const [currUser, setCurrUser] = useState(null);
  const [currChat, setCurrChat] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setCurrUser(data);
      setCurrChat(data.current_chat_id);
    };

    getResource("/api/v1/users/show", abortController, dataHandler);

    return () => {
      abortController.abort(); // cancel request if unmount
    };
  }, []);
  return { currUser, currChat, setCurrChat };
};
