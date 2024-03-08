import { useEffect, useState } from "react";

/* hook used to fetch the currently signed in user, provided by context to the 
components that care about either the user or the current chat. 
*/

export const useCurrentUser = () => {
  const [currUser, setCurrUser] = useState(null);
  const [currChat, setCurrChat] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getUser = async () => {
      console.log("fetching current user"); // for testing
      try {
        const response = await fetch("/api/v1/users/show", {
          mode: "cors",
          signal: abortController.signal,
        });

        if (response.status >= 400) {
          console.log(response.status);
          throw new Error("server error");
        }
        const data = await response.json();
        setCurrUser(data);
        setCurrChat(data.current_chat_id);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();

    return () => {
      abortController.abort(); // cancel request if unmount
    };
  }, []);
  return { currUser, currChat, setCurrChat };
};
