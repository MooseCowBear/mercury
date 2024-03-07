import React from "react";
import MessageForm from "./MessageForm";

export default NewMessageForm = ({ currentRoom, setImageUpload }) => {
  const clickHandler = () => {
    setImageUpload(true);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={clickHandler} aria-label="add image">
        <svg
          className="h-9 w-9 fill-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill=""
            d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
          />
        </svg>
      </button>
      <MessageForm currentRoom={currentRoom} />
    </div>
  );
};
