import React, { useState } from "react";
import { isUserActive } from "../utils/users";

export default function PersonCard({ person, setSelectedPeople }) {
  const [selected, setSelected] = useState(false);
  const active = isUserActive(person.last_active);

  const toggleSelected = () => {
    if (selected) {
      setSelectedPeople((val) => {
        const data = val.filter((elem) => elem !== person);
        return data;
      });
    } else {
      setSelectedPeople((val) => {
        const data = [...val];
        data.push(person);
        return data;
      });
    }
    setSelected((val) => !val);
  };

  return (
    <button
      onClick={toggleSelected}
      className={`w-full flex justify-between items-center py-2 px-4 ${
        selected && "bg-neutral-100"
      }`}
    >
      <h3>{person.username}</h3>
      {active && <span className="text-xs text-gray-400">active</span>}
    </button>
  );
}
