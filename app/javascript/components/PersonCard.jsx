import React from "react";

export default PersonCart = ({
  person,
  setCurrentRoom,
  setError,
  setViewPeople,
}) => {
  const clickHandler = () => {
    const getPrivateRoom = async () => {
      const url = "/api/v1/private_rooms/create";
      const token = document.querySelector('meta[name="csrf-token"]').content;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: person.id }),
        });

        if (response.status !== 200) {
          throw new Error("An error occured.");
        }

        const parsedResponse = await response.json();

        setCurrentRoom(parsedResponse);
        setError(null);
        setViewPeople(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getPrivateRoom();
  };

  // TODO: when we have profiles this will be updated.

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center p-4 rounded-full h-[30px] w-[30px] border-2 border-cyan-800 text-cyan-800">
        {person.username[0]}
      </div>
      <div>
        <h3 className="uppercase tracking-wider">{person.username}</h3>
        <button
          className="lowercase hover:text-cyan-800 focus:text-cyan-800"
          onClick={clickHandler}
        >
          Send a message
        </button>
      </div>
    </div>
  );
};
