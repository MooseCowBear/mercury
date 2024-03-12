import React from "react";
import SelectedPerson from "./SelectedPerson";

export default function NewPrivateChatForm({ people, setSelectedPeople }) {
  // needs a create button...
  // create button creates the chat on the back end and also clears set people
  // and sets user's room and disappears people side bar!

  const submitHandler = () => {
    // send request to create new private chat/find if existing
    // and update curr user chat to it
  };

  return (
    <div>
      <div>
        {people.length == 0 && <p>No one has been selected</p>}
        {people.map((person) => {
          return (
            <SelectedPerson
              key={person.id}
              person={person}
              setSelectedPeople={setSelectedPeople}
            />
          );
        })}
      </div>
      <button onClick={submitHandler}>create</button>
    </div>
  );
}
