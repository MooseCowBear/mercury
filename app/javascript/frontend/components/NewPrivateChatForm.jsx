import React from "react";
import SelectedPerson from "./SelectedPerson";
import Plus from "../icons/Plus";

export default function NewPrivateChatForm({
  selectedPeople,
  setSelectedPeople,
}) {
  const submitHandler = () => {
    // send request to create new private chat/find if existing
    // and update curr user chat to it
  };

  return (
    <div className="grid grid-cols-[1fr,_auto] items-center gap-1 m-4">
      <div className="border-[1px] rounded-full px-3 py-2">
        {selectedPeople.length == 0 && (
          <p className="text-xs text-neutral-400">No one has been selected</p>
        )}
        {selectedPeople.map((person) => {
          return (
            <SelectedPerson
              key={person.id}
              selectedPerson={person}
              setSelectedPeople={setSelectedPeople}
            />
          );
        })}
      </div>
      <button className="bg-poppy-500 p-1 rounded-full" onClick={submitHandler}>
        <Plus />
      </button>
    </div>
  );
}
