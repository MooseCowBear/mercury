import React, { useState } from "react";
import useOtherUsers from "../helpers/useOtherUsers";
import PersonCard from "./PersonCard";

export default People = ({ setCurrentRoom, setViewPeople }) => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useOtherUsers(setPeople, setError, setLoading);

  if (error) return <p>Something went wrong</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <ul className="grid grid-cols-autofit gap-5 w-full">
      {people.map((person) => {
        return (
          <li
            key={person.id}
            className="rounded-md bg-gray-100 px-5 py-2 border-2 border-gray-200"
          >
            <PersonCard
              person={person}
              setCurrentRoom={setCurrentRoom}
              setError={setError}
              setViewPeople={setViewPeople}
            />
          </li>
        );
      })}
    </ul>
  );
};
