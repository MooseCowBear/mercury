import React from "react";
import CloseBox from "../icons/CloseBox";

export default function SelectedPerson({ selectedPerson, setSelectedPeople }) {
  const deselect = () => {
    setSelectedPeople((val) => val.filter((elem) => elem !== selectedPerson));
  };

  return (
    <div className="bg-neutral-800 text-white px-2 py-1 rounded-lg w-fit flex gap-1">
      {selectedPerson.username}
      <button className="" onClick={deselect}>
        <CloseBox />
      </button>
    </div>
  );
}
