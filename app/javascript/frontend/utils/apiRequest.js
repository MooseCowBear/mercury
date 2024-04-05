export const getResource = async (url, abortController) => {
  const response = await fetch(url, {
    mode: "same-origin",
    signal: abortController.signal,
  });

  if (response.status >= 400) {
    throw new Error("server error");
  }
  return response.json(); // now returns a promise or an error
};

export const postResource = async (url, body, method, json = true) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const headers = json
    ? { "X-CSRF-Token": token, "Content-Type": "application/json" }
    : {
        "X-CSRF-Token": token,
      };

  const response = await fetch(url, {
    mode: "same-origin",
    method: method,
    headers: headers,
    body: body,
  });

  if (response.status !== 200 && response.status !== 422) {
    throw new Error("server error");
  }
  return response.json();
};

export const deleteResource = async (url) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const response = await fetch(url, {
    mode: "same-origin",
    method: "DELETE",
    headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
  });

  if (response.status !== 200) { // if can't find record
    throw new Error("server error");
  }
  return;
}