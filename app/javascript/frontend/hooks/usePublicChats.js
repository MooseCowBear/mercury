import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

export const usePublicChats = () => {
  const [publicChats, setPublicChats] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setPublicChats(data);
    };

    getResource("/api/v1/public_chats", abortController)
      .then((data) => dataHandler(data))
      .catch((e) => console.log(e));

    return () => {
      abortController.abort();
    };
  }, []);
  return { publicChats, setPublicChats };
};
