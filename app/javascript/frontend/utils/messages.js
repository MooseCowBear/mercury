export const editedMessage = (message) => {
  return message.created_at !== message.updated_at;
}

export const ownedByUser = (message, userInfo) => {
  return message.user.id === userInfo.id;
}