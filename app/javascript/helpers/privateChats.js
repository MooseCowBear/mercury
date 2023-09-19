export const getInterlocutor = (room, user) => {
  // the name of the room will be: pc_username1_username2
  const [_, one, two] = room.name.split("_");
  return user.username == one ? two : one;
};