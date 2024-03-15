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

/* backend will delete notifications for a chat when a user enters it, but
the frontend also needs to update. rather than rebroadcast the chat whenever a user 
updates their current chat, we can just clear them on the frontend */
export const clearNotifications = (chatId, chats) => {
  const data = [...chats];
  const index = data.findIndex((elem) => elem.id === chatId);
  if (index > -1) {
    data[index].notification_count = 0;
  }
  return data;
};

// NOTE: if wanted to move the entered chat to the top of the list
// could just rebroadcast chat..
