export const getResource = async (
  url,
  abortController,
  dataHandler,
  errorHandler = null
) => {
  try {
    const response = await fetch(url, {
      mode: "cors",
      signal: abortController.signal,
    });

    if (response.status >= 400) {
      console.log(response.status);
      throw new Error("server error");
    }
    const data = await response.json();
    dataHandler(data);
  } catch (e) {
    console.log(e);
    if (errorHandler) {
      errorHandler(e);
    }
  }
};

export const postResource = async (
  url,
  body,
  method,
  dataHandler,
  errorHandler = null
) => {
  try {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch(url, {
      mode: "cors",
      method: method,
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (response.status !== 200 && response.status !== 422) {
      console.log(response.status);
      throw new Error("server error");
    }
    const data = await response.json();
    dataHandler(data);
  } catch (e) {
    console.log(e);
    if (errorHandler) {
      errorHandler(e);
    }
  }
};
