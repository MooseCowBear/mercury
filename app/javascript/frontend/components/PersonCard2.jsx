import React, { useState } from "react";
import { isUserActive } from "../utils/users";

export default function PersonCard({ person, setSelectedPeople }) {
  const [selected, setSelected] = useState(false);

  const active = isUserActive(person.last_active);

  const toggleSelected = () => {
    if (selected) {
      setSelectedPeople((val) => {
        return val.filter((elem) => elem !== person);
      });
    } else {
      setSelectedPeople((val) => {
        const data = [...val];
        return data.push(person);
      });
    }
    setSelected((val) => !val);
  };

  return (
    <button
      onClick={toggleSelected}
      className={`w-full flex justify-between items-center py-2 px-3 ${
        selected && "bg-neutral-100"
      }`}
    >
      <h3>{person.username}</h3>
      {active && <span className="text-xs text-gray-400">active</span>}
    </button>
  );
}
