import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

/* hook used to fetch the currently signed in user, provided by context to the 
components that care about either the user or the current chat. 
*/

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setUserInfo(data);
    };

    getResource("/api/v1/users/show", abortController)
      .then((data) => dataHandler(data))
      .catch((e) => console.log(e));

    return () => {
      abortController.abort(); // cancel request if unmount
    };
  }, []);
  return { userInfo, setUserInfo };
};
