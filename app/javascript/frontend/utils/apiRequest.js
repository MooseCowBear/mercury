export const getResource = async (url, abortController) => {
  const response = await fetch(url, {
    mode: "cors",
    signal: abortController.signal,
  });

  if (response.status >= 400) {
    throw new Error("server error");
  }
  return response.json(); // now returns a promise or an error
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

export const postResource2 = async (url, body, method) => {
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
    throw new Error("server error");
  }
  return response.json();
};
