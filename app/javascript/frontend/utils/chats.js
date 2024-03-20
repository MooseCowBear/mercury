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

// shared by both the chat sidebar and by the main chat component
export const chatTitle = (chat, userInfo) => {
  if (!userInfo) return "";
  return chat.is_private ? privateTitle(chat, userInfo) : chat.name;
};

// for chat sidebar
export const chatInitial = (chat, userInfo) => {
  if (!userInfo) return "";
  return chatTitle(chat, userInfo)[0];
};

export const chatMembers = (chat) => {
  return chat.name.split(", ").length;
};

/* helper, takes chat's name, which is a string of usernames sorted alphabetically
and joined with commas, and replaced curr user's name with 'me', 
re-sorts and re-joins */
const privateTitle = (chat, userInfo) => {
  return chat.name
    .split(", ")
    .map((elem) => {
      if (elem === userInfo.username) {
        return "me";
      } else {
        return elem;
      }
    })
    .sort()
    .join(", ");
};

// functions for the chat and people search bars
export const filterChats = (chats, filterChatsBy, userInfo) => {
  return chats.filter((elem) =>
    chatTitle(elem, userInfo).includes(filterChatsBy)
  );
};

export const filterPeople = (people, filterPeopleBy) => {
  return people.filter((elem) => elem.username.includes(filterPeopleBy));
};

// helper for should the new message form be disabled
export const disabled = (userInfo) => {
  return (
    !userInfo || !userInfo.current_chat_id || userInfo.current_chat_silenced
  );
}