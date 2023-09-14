import React, { useState, useEffect } from "react";
import useCurrUserAndInitialRooms from "../helpers/useCurrUserAndInitialRooms"; 
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import ChatMessages from "./ChatMessages";
import People from "./People";

export default MainScreen = () => {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [privateChats, setPrivateChats] = useState([]);
  const [viewPeople, setViewPeople] = useState(false);

  useCurrUserAndInitialRooms(setUser, setRooms, setError, setLoading);

  useEffect(() => {
    // get the initial private rooms after we get user
    const getPrivateChats = async () => {
      try {
        const response = await fetch("/api/v1/private_rooms/index");

        if (!response.ok) {
          throw new Error("Server error");
        }
        const data = await response.json();
        console.log("data received from get private chats", data);
        setPrivateChats(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    if (user) {
      console.log("fetching private chats...");
      getPrivateChats();
    }
  }, [user]);

  if (error) return <p>Something went wrong.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="border grid grid-cols-1 md:grid-cols-[auto_1fr] grid-rows-2 md:grid-rows-[600px] gap-3 rounded-lg shadow-sm bg-gray-50">
      <SideBar
        user={user}
        rooms={rooms}
        setRooms={setRooms}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        privateChats={privateChats}
        setPrivateChats={setPrivateChats}
        setViewPeople={setViewPeople}
      />
      <div className="p-5 md:col-start-2 row-start-1 flex flex-col gap-5 items-center">
        {user && <p className="self-end">{`Hello, ${user.username}!`}</p>}
        {viewPeople && (
          <People
            setCurrentRoom={setCurrentRoom}
            setViewPeople={setViewPeople}
          />
        )}
        {!viewPeople && currentRoom && (
          <ChatMessages user={user} currentRoom={currentRoom} />
        )}
        {!viewPeople && !currentRoom && <Welcome />}
      </div>
    </div>
  );
};
