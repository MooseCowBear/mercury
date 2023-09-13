import { useEffect } from "react";

export default useOtherUsers = (setOtherUsers, setError, setLoading) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/v1/users/index");

        if (!response.ok) {
          throw new Error("Server error");
        }

        const otherUserData = await response.json();

        setOtherUsers(otherUserData);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
};
