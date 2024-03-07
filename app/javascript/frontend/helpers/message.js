import copyObjectArr from "./copy"

export const updateMessagesAfterDelete = (parsedResponse, messages) => {
  const newMessages = copyObjectArr(messages);
  const afterDelete = newMessages.filter(
    (elem) => elem.id !== parsedResponse.id
  );
  return afterDelete;
};