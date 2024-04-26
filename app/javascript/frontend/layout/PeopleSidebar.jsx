import React, { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import PersonCard from "../components/PersonCard";
import NewPrivateChatForm from "../components/NewPrivateChatForm";
import { usePeople } from "../hooks/usePeople";
import { filterPeople } from "../utils/chats";

export default function PeopleSidebar() {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [filterPeopleBy, setFilterPeopleBy] = useState("");

  const { error, loading, people } = usePeople();

  const filteredPeople = filterPeople(people, filterPeopleBy);

  return (
    <div className="grid grid-rows-[auto,_1fr] gap-2">
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
