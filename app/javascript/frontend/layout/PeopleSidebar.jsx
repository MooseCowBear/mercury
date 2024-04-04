import React, { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import PersonCard from "../components/PersonCard";
import { getResource } from "../utils/apiRequest";

import NewPrivateChatForm from "../components/NewPrivateChatForm";
import { filterPeople } from "../utils/chats";

export default function PeopleSidebar() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [filterPeopleBy, setFilterPeopleBy] = useState("");

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

  const filteredPeople = filterPeople(people, filterPeopleBy);

  return (
    <div className="grid grid-rows-[auto,_1fr] gap-2  min-w-fit">
      <Searchbar title="People" onChangeHandler={setFilterPeopleBy} />
      <div className="bg-white rounded-xl shadow divide-y-[1px] dark:divide-neutral-600 min-w-0 grid grid-rows-[auto,_1fr] min-h-0 dark:bg-neutral-800/90">
        <NewPrivateChatForm
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />
        <div className="overflow-y-auto min-h-0 divide-y-[1px] dark:divide-neutral-600">
          {filteredPeople.map((person) => {
            return (
              <PersonCard
                key={person.id}
                person={person}
                setSelectedPeople={setSelectedPeople}
              />
            );
          })}
        </div>
        {error && <p>Something went wrong</p>}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
