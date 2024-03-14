import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

/* hook to grab the initially existing public chats */

export const usePublicChats = () => {
  const [publicChats, setPublicChats] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setPublicChats(data);
    };

    getResource("/api/v1/public_chats/index", abortController, dataHandler);

    return () => {
      abortController.abort(); // cancel request if unmount
    };
  }, []);
  return { publicChats, setPublicChats };
};
