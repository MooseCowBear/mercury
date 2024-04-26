import { useEffect, useState } from "react";
import { getResource } from "../utils/apiRequest";

export const usePeople = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const dataHandler = (data) => {
      setPeople(data);
      setError(null);
      setLoading(false);
    };

    const errorHandler = (e) => {
      setError(true);
      setLoading(false);
    };

    getResource("/api/v1/users", abortController)
      .then((data) => dataHandler(data))
      .catch((e) => errorHandler(e));

    return () => {
      abortController.abort();
    };
  }, []);
  return { error, loading, people };
}