import React, { useState, useEffect } from "react";
import PersonCard from "./PersonCard";
import { makeGetRequest } from "../helpers/apiRequest";

export default People = ({ setCurrentRoom, setViewPeople }) => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const setPeopleAndError = (data) => {
    setPeople(data);
    setError(null);
  }

  useEffect(() => {
    makeGetRequest("/api/v1/users/index")
      .then((data) => setPeopleAndError(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p>Something went wrong</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <ul className="grid grid-cols-autofit gap-5 w-full p-5 md:py-5 md:px-0">
      {people.map((person) => {
        return (
          <li
            key={person.id}
            className="rounded-md bg-gray-100 px-5 py-2 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
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
