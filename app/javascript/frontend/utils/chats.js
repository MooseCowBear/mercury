/* chat create action returns chat information want new chat to appear 
at the top of the chats display */
export const updateChats = (data, chats) => {
  const chatsMinusData = chats.filter((elem) => elem.id !== data.id);
  return [data].concat(chatsMinusData);
};

/* backend wants ids of chat participants, including the user who initiated the chat.
need to take people objects and transform them into the params the backend expects.
*/
export const selectedPeopleIds = (selectedPeople, userInfo) => {
  const selectedPeopleIdArr = selectedPeople.map((person) => {
    return { user_id: person.id };
  });
  selectedPeopleIdArr.push({ user_id: userInfo.id });
  return selectedPeopleIdArr;
};
