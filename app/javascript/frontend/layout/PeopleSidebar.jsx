import React, { useState } from "react";
import Searchbar from "../components/SearchBar";

export default function PeopleSidebar({ visible }) {
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);

  return (
    <div
      className={`${
        visible
          ? "grid grid-rows-[auto,_1fr] gap-2 overflow-y-auto  min-w-fit"
          : "hidden"
      }`}
    >
      <Searchbar title="People" />
      <div className="bg-white rounded-xl shadow divide-y-[1px]"></div>
    </div>
  );
}

// want a search bar and then people listed alphabetically...

// search bar input size -- how is is currently being determined?
