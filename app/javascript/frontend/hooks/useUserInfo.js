import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setUserInfo(data);
      setUserID(data.id);
    };

    getResource("/api/v1/users/show", abortController)
      .then((data) => dataHandler(data))
      .catch((e) => console.log(e));

    return () => {
      abortController.abort();
    };
  }, []);
  return { userID, userInfo, setUserInfo };
};
