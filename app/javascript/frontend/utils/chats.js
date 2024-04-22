export const updateChats = (data, chats) => {
  const updatedChats = chats.filter((elem) => elem.id !== data.id);
  updatedChats.push(data);
  return updatedChats.sort(sortByLastMessage);
};

const sortByLastMessage = (a, b) => {
  if (a.last_message && b.last_message) {
    return (
      new Date(b.last_message.created_at) - new Date(a.last_message.created_at)
    );
  } else if (a.last_message) {
    return -1;
  } else if (b.last_message) {
    return 1;
  } else {
    return new Date(b.created_at) - new Date(a.created_at);
  }
};

export const selectedPeopleIds = (selectedPeople, userInfo) => {
  const selectedPeopleIdArr = selectedPeople.map((person) => {
    return { user_id: person.id };
  });
  selectedPeopleIdArr.push({ user_id: userInfo.id });
  return selectedPeopleIdArr;
};

export const privateChatName = (selectedPeople, userInfo) => {
  const usernames = selectedPeople.map((person) => {
    return person.username;
  });
  usernames.push(userInfo.username);
  return usernames.sort().join(", ");
};

export const clearNotifications = (chatId, chats) => {
  const data = [...chats];
  const index = data.findIndex((elem) => elem.id === chatId);
  if (index > -1) {
    data[index].notification_count = 0;
  }
  return data;
};

export const chatTitle = (chat, userInfo) => {
  if (!userInfo) return "";
  return chat.is_private ? privateTitle(chat, userInfo) : chat.name;
};

export const chatInitial = (chat, userInfo) => {
  if (!userInfo) return "";
  return chatTitle(chat, userInfo)[0];
};

export const chatMembers = (chat) => {
  return chat.name.split(", ").length;
};

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

export const filterChats = (chats, filterChatsBy, userInfo) => {
  return chats.filter((elem) =>
    chatTitle(elem, userInfo).includes(filterChatsBy)
  );
};

export const filterPeople = (people, filterPeopleBy) => {
  return people.filter((elem) => elem.username.includes(filterPeopleBy));
};

export const blocked = (userInfo) => {
  return (
    !userInfo || !userInfo.current_chat_id || userInfo.current_chat_silenced
  );
};
