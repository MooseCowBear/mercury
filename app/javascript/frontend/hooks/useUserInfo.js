import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

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
      abortController.abort();
    };
  }, []);
  return { userInfo, setUserInfo };
};
