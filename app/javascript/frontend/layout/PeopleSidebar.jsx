import React from "react";
import Searchbar from "../components/SearchBar";

export default function PeopleSidebar() {
  return (
    <div className={`grid grid-rows-[auto,_1fr] gap-2`}>
      <Searchbar title="People" />
      <div className="bg-white rounded-xl shadow divide-y-[1px]"></div>
    </div>
  );
}

// want a search bar and then people listed alphabetically...

// search bar input size -- how is is currently being determined?
