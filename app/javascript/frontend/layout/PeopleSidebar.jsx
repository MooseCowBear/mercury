import React, { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import PersonCard from "../components/PersonCard";
import { getResource } from "../utils/apiRequest";
import NewPrivateChatForm from "../components/NewPrivateChatForm";

export default function PeopleSidebar() {
  const { visibility } = useVisibilityContext();
  const visible = visibility.people;
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    getResource("/api/v1/users", abortController, setPeople);

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div
      className={`${
        visible
          ? "grid grid-rows-[auto,_1fr] gap-2 overflow-y-auto  min-w-fit"
          : "hidden"
      }`}
    >
      <Searchbar title="People" />
      <div className="bg-white rounded-xl shadow divide-y-[1px]">
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
