import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

export const usePrivateChats = () => {
  const [privateChats, setPrivateChats] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setPrivateChats(data);
    };

    getResource("/api/v1/private_chats", abortController)
      .then((data) => dataHandler(data))
      .catch((e) => console.log(e));

    return () => {
      abortController.abort();
    };
  }, []);
  return { privateChats, setPrivateChats };
};
