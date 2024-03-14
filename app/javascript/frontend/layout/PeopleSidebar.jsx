import React, { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import PersonCard from "../components/PersonCard";
import { getResource } from "../utils/apiRequest";
import NewPrivateChatForm from "../components/NewPrivateChatForm";

export default function PeopleSidebar() {
  const { visibility } = useVisibilityContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const visible = visibility.people;

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

    getResource("/api/v1/users", abortController, dataHandler, errorHandler);

    return () => {
      abortController.abort();
    };
  }, []);

  if (error) return <p>Something went wrong</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div
      className={`${
        visible
          ? "grid grid-rows-[auto,_1fr] gap-2 overflow-y-auto  min-w-fit"
          : "hidden"
      }`}
    >
      <Searchbar title="People" />
      <div className="bg-white rounded-xl shadow divide-y-[1px] min-w-0">
        <NewPrivateChatForm
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />
        {people.map((person) => {
          return (
            <PersonCard
              key={person.id}
              person={person}
              setSelectedPeople={setSelectedPeople}
            />
          );
        })}
      </div>
    </div>
  );
}

// search bar input size -- how is is currently being determined?
