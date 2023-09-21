import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import ChatMessages from "./ChatMessages";
import People from "./People";
import { makeGetRequest, makeMultiGetRequest } from "../helpers/apiRequest";

export default MainScreen = () => {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [privateChats, setPrivateChats] = useState([]);
  const [viewPeople, setViewPeople] = useState(false);

  const setUserAndRooms = (data) => {
    const [userData, roomsData] = data;
    setUser(userData);
    setRooms(roomsData);
    setError(null);
  }

  useEffect(() => {
    makeMultiGetRequest(["/api/v1/users/show", "/api/v1/rooms/index"])
      .then((data) => setUserAndRooms(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const setPrivateChatsAndError = (data) => {
    setPrivateChats(data);
    setError(null);
  }

  useEffect(() => {
    if (user) {
      makeGetRequest("/api/v1/private_rooms/index")
        .then((data) => setPrivateChatsAndError(data))
        .catch((error) => setError(error));
    }
  }, [user])

  if (error) return <p>Something went wrong.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="border grid grid-cols-1 md:grid-cols-[auto_1fr] grid-rows-[auto_1fr] md:grid-rows-1 gap-3 rounded-lg shadow-sm bg-gray-50 h-full dark:bg-gray-700 dark:border-gray-600">
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
      <div className="p-1 md:p-5 md:col-start-2 row-start-1 grid-cols-1 grid-rows-[auto_1fr] place-items-center">
        {user && <p className="text-right">{`Hello, ${user.username}!`}</p>}
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
