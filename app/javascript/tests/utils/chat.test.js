import {
  updateChats,
  selectedPeopleIds,
  clearNotifications,
  chatTitle,
  chatInitial,
  chatMembers,
  filterChats,
  filterPeople,
  blocked,
  privateChatName,
} from "../../frontend/utils/chats";

describe("updateChats", () => {
  it("returns chats with most recent last message first", () => {
    const existingChats = [
      {
        id: 2,
        last_message: { created_at: "2012-04-11T10:20:30Z" },
      },
      {
        id: 1,
        last_message: { created_at: "2011-04-11T10:20:30Z" },
      },
    ];
    const newChatData = {
      id: 1,
      last_message: { created_at: "2013-04-11T10:20:30Z" },
    };

    const res = updateChats(newChatData, existingChats);

    expect(res.length).toBe(2);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
  });

  it("returns a chat with no messages after chat with message", () => {
    const existingChats = [
      {
        id: 2,
      },
      {
        id: 1,
        last_message: { created_at: "2011-04-11T10:20:30Z" },
      },
    ];
    const newChatData = {
      id: 1,
      last_message: { created_at: "2013-04-11T10:20:30Z" },
    };
    const res = updateChats(newChatData, existingChats);
    expect(res.length).toBe(2);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
  });

  it("returns two chats without messages in descending order of creation", () => {
    const existingChats = [
      {
        id: 2,
        created_at: "2012-04-11T10:20:30Z",
      },
      {
        id: 1,
        created_at: "2011-04-11T10:20:30Z",
      },
    ];
    const newChatData = { id: 3, created_at: "2013-04-11T10:20:30Z" };

    const res = updateChats(newChatData, existingChats);
    expect(res.length).toBe(3);
    expect(res[0].id).toBe(3);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(1);
  });
});

describe("selectedPeopleIds", () => {
  it("takes array of user objects and current user object and returns an array in the desired format", () => {
    const testUserArr = [{ id: 1 }, { id: 2 }];
    const testUser = { id: 3 };
    const res = selectedPeopleIds(testUserArr, testUser);
    expect(res.length).toEqual(3);
    expect(res.some((elem) => elem.user_id === 1)).toBeTruthy();
    expect(res.some((elem) => elem.user_id === 2)).toBeTruthy();
    expect(res.some((elem) => elem.user_id === 3)).toBeTruthy();
  });

  it("returns new array containing only current user if array of user objects is empty", () => {
    const testUserArr = [];
    const testUser = { id: 1 };
    const res = selectedPeopleIds(testUserArr, testUser);
    expect(res.length).toEqual(1);
    expect(res.some((elem) => elem.user_id === 1)).toBeTruthy();
  });
});

describe("privateChatName", () => {
  it("returns usernames of selectedPeople and user in an alphebetically sorted comma seperated string", () => {
    const testUserArr = [{ username: "frank" }, { username: "bob" }];
    const testUser = { username: "alice" };
    const expected = "alice, bob, frank";
    expect(privateChatName(testUserArr, testUser)).toEqual(expected);
  });
});

describe("clearNotifications", () => {
  it("takes a chat id and chats array and returns a copy of chats array with the notification count for chat with id equal to 0", () => {
    const testChatId = 1;
    const testChats = [
      { id: 1, notification_count: 1 },
      { id: 2, notification_count: 2 },
    ];
    const res = clearNotifications(testChatId, testChats);
    expect(res).not.toBe(testChats);
    expect(res.length).toEqual(2);
    expect(res.some((elem) => elem.id === 1 && elem.notification_count === 0));
    expect(res.some((elem) => elem.id === 2 && elem.notification_count === 2));
  });
});

describe("chatTitle", () => {
  it("returns name if chat is public", () => {
    const testUser = { username: "test" };
    const testChat = { name: "chat name" };
    expect(chatTitle(testChat, testUser)).toEqual("chat name");
  });

  it("returns private chat name with user's username replaced with 'me'", () => {
    const testUser = { username: "test user" };
    const testChat = { name: "ally, frank, test user", is_private: true };
    expect(chatTitle(testChat, testUser)).toEqual("ally, frank, me");
  });

  it("re-alphabetizes private chat name", () => {
    const testUser = { username: "test user" };
    const testChat = { name: "ally, sophie, test user", is_private: true };
    expect(chatTitle(testChat, testUser)).toEqual("ally, me, sophie");
  });
});

describe("chatInitial", () => {
  it("returns the first initial of chat name if current user information", () => {
    const testUser = { username: "fred" };
    const testChat = { name: "test" };
    expect(chatInitial(testChat, testUser)).toEqual("t");
  });

  it("returns empty string if no current user information", () => {
    const testUser = null;
    const testChat = { name: "test" };
    expect(chatInitial(testChat, testUser)).toEqual("");
  });
});

describe("chatMembers", () => {
  it("returns number of members in a private chat", () => {
    const testChat = { name: "frank, sally, zoey" };
    expect(chatMembers(testChat)).toEqual(3);
  });
});

describe("filterChats", () => {
  it("returns all chats if filterChatsBy is empty string", () => {
    const testChats = [{ name: "one" }, { name: "two" }, { name: "three" }];
    const testUser = { username: "test" };
    expect(filterChats(testChats, "", testUser)).toEqual(testChats);
  });

  it("accepts userInfo of null", () => {
    const testChats = [{ name: "one" }, { name: "two" }, { name: "three" }];
    const testUser = null;
    expect(filterChats(testChats, "", testUser)).toEqual(testChats);
  });

  it("returns subset of chats containing filterChatsBy as substring", () => {
    const testChats = [{ name: "one" }, { name: "two" }, { name: "three" }];
    const testUser = { username: "test" };
    expect(filterChats(testChats, "o", testUser)).toEqual([
      { name: "one" },
      { name: "two" },
    ]);
  });
});

describe("filterPeople", () => {
  it("returns all people if filterPeopleBy is empty string", () => {
    const testPeople = [
      { username: "one" },
      { username: "two" },
      { username: "three" },
    ];
    expect(filterPeople(testPeople, "")).toEqual(testPeople);
  });

  it("returns subset of people containing filterPeopleBy as substring", () => {
    const testPeople = [
      { username: "one" },
      { username: "two" },
      { username: "three" },
    ];
    expect(filterPeople(testPeople, "t")).toEqual([
      { username: "two" },
      { username: "three" },
    ]);
  });
});

describe("blocked", () => {
  it("returns true if no user info", () => {
    const testUser = null;
    expect(blocked(testUser)).toBeTruthy();
  });

  it("returns true if no current chat", () => {
    const testUser = { id: 1, current_chat_id: null };
    expect(blocked(testUser)).toBeTruthy();
  });

  it("returns true if current chat is silenced", () => {
    const testUser = { id: 1, current_chat_silenced: true };
    expect(blocked(testUser)).toBeTruthy();
  });

  it("returns false otherwise", () => {
    const testUser = {
      id: 1,
      current_chat_id: 2,
      current_chat_silenced: false,
    };
    expect(blocked(testUser)).toBeFalsy();
  });
});
