import {
  updateChats,
  selectedPeopleIds,
  clearNotifications,
} from "../../frontend/utils/chats";

describe("updateChats", () => {
  it("creates a new chat array with the new chat at index 0", () => {
    const testChats = [{ id: 1 }];
    const testData = { id: 2 };
    const res = updateChats(testData, testChats);
    expect(res).not.toBe(testChats);
    expect(res[0]).toBe(testData);
    expect(res.length).toEqual(2);
  });

  it("creates a new chat array with updated chat at index 0", () => {
    const testChats = [{ id: 1 }, { id: 2 }];
    const testData = { id: 2 };
    const res = updateChats(testData, testChats);
    expect(res).not.toBe(testChats);
    expect(res[0]).toBe(testData);
    expect(res.length).toEqual(2);
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
