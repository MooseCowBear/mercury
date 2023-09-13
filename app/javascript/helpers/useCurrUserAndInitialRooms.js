import { useEffect } from "react";

export default useCurrUserAndInitialRooms = (
  setUser,
  setRooms,
  setError,
  setLoading
) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Promise.all([
          fetch("/api/v1/users/show"),
          fetch("/api/v1/rooms/index"),
        ]);

        if (!response[0].ok || !response[1].ok) {
          throw new Error("Server error");
        }

        const [userData, roomsData] = await Promise.all(
          response.map(async (data) => await data.json())
        );

        setUser(userData);
        setRooms(roomsData);
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
