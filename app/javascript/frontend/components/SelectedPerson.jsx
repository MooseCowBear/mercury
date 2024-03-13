import React from "react";
import Close from "../icons/Close";

export default function SelectedPerson({ selectedPerson, setSelectedPeople }) {
  const deselect = () => {
    setSelectedPeople((val) => val.filter((elem) => elem !== selectedPerson));
  };

  return (
    <div className="bg-neutral-800 text-white p-2 rounded-lg w-fit flex gap-1">
      {selectedPerson.username}
      <button className="" onClick={deselect}>
        <Close />
      </button>
    </div>
  );
}
