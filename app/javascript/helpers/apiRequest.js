export const makeAPIrequest = async (
  url,
  body,
  method,
  errorSetter,
  setState = null,
  resetForm = null,
  currentRoom = null
) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 200 && response.status !== 422) {
      if (resetForm) resetForm();
      throw new Error("Request could not be completed.");
    }

    const parsedResponse = await response.json();

    if (parsedResponse.hasOwnProperty("errors")) {
      errorSetter(parsedResponse.errors.join(", "));
    } else {
      if (setState) setState(parsedResponse, currentRoom);
      if (resetForm) resetForm();
    }
  } catch (error) {
    errorSetter(error);
  }
};
