import React from "react";

export default function SelectedPerson({ person, setSelectedPeople }) {
  // set people could be just ids
  const deselect = () => {
    setSelectedPeople((val) => val.filter((elem) => elem !== person));
  };

  return (
    <div>
      {person.username}
      <button onClick={deselect}>x</button>
    </div>
  );
}
