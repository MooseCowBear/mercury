import React, { useState } from "react";
import SelectedPerson from "./SelectedPerson";
import SendCircle from "../icons/SendCircle";
import { selectedPeopleIds } from "../utils/chats";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { postResource } from "../utils/apiRequest";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";

/* like for public chats, want a newly created private chat to appear for the creator
even before the first message is sent. uses same operation. adds the new private
chat to the top of the private chats list */

export default function NewPrivateChatForm({
  selectedPeople,
  setSelectedPeople,
}) {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { chatVisibilityHandler } = useVisibilityContext();
  const { setPrivateChats } = usePrivateChatsContext();

  const [error, setError] = useState(null);

  const submitHandler = () => {
    if (selectedPeople.length === 0) return;
    const ids = selectedPeopleIds(selectedPeople, userInfo);

    const dataHandler = (data) => {
      if (data.hasOwnProperty("errors")) {
        setError(data.errors.join(", "));
      } else {
        setSelectedPeople([]);
        setUserInfo(data);
        setPrivateChats((chats) => {
          const updatedChats = [data.current_chat].concat(chats);
          return updatedChats;
        });
        chatVisibilityHandler();
      }
    };

    postResource(
      "/api/v1/private_chats",
      JSON.stringify({ chat_participants_attributes: ids }),
      "POST"
    )
      .then((data) => dataHandler(data))
      .catch((e) => console.log(error));
  };

  return (
    <div className="grid grid-cols-[1fr,_auto] items-center gap-1 m-4">
      {error && <span className="justify-self-center text-xs">{error}</span>}
      <div className="border-[1px] rounded-full px-3 py-3 flex justify-center items-center flex-wrap gap-1">
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
      <button aria-label="create chat" onClick={submitHandler}>
        <SendCircle />
      </button>
    </div>
  );
}
