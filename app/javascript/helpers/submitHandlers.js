export const editMessageSubmitHandler = (
  currentRoom,
  body,
  setBody,
  setInputError,
  setValidationError,
  id
) => {
  const resetForm = () => {
    setBody("");
    setInputError(null);
    setValidationError(null);
  };

  const input = document.getElementById("body").value;
  console.log("input is", input);
  if (input.trim() === "") {
    console.log("am i here?");
    setInputError(true);
    return true;
  }

  const updateMessage = async () => {
    const url = `/api/v1/messages/update/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const room_id = currentRoom.id;
    const fetchBody = { body, room_id };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchBody),
      });
      // is this what we want?
      if (response.status !== 200 && response.status !== 422) {
        resetForm();
        throw new Error("A network error occured.");
      }

      const parsedResponse = await response.json();
      console.log(parsedResponse);

      if (parsedResponse.hasOwnProperty("errors")) {
        setValidationError(parsedResponse.errors);
        return true;
      } else {
        resetForm();
      }
    } catch (error) {
      console.log(error);
      setValidationError(["Request could not be completed"]);
    }
  };
  updateMessage();
};

export const createMessageSubmitHandler = (
  currentRoom,
  body,
  setInputError,
  setValidationError
) => {
  console.log("new message form submitted");

  const input = document.getElementById("body").value;
  if (input.trim() === "") {
    setInputError(true);
    return;
  }

  const createMessage = async () => {
    const url = "/api/v1/messages/create";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const room_id = currentRoom.id;
    const fetchBody = { body, room_id };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchBody),
      });

      // is this what we want?
      if (response.status !== 200 && response.status !== 422) {
        resetForm();
        throw new Error("A network error occured.");
      }

      const parsedResponse = await response.json();
      console.log(parsedResponse);

      if (parsedResponse.hasOwnProperty("errors")) {
        setValidationError(parsedResponse.errors);
      } else {
        resetForm();
      }
    } catch (error) {
      console.log(error);
      setValidationError(["Request could not be completed"]);
    }
  };
  createMessage();
};
