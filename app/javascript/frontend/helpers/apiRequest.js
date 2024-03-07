export const makeGetRequest = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }
  throw new Error("Server Error");
};

export const makeMultiGetRequest = async (urls) => {
  const response = await Promise.all(urls.map((u) => fetch(u)));

  if (response.every((r) => r.ok)) {
    return Promise.all(response.map(async (data) => await data.json()));
  }
  throw new Error("Server Error");
};

export const makePostRequest = async (url, body, method) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const response = await fetch(url, {
    method: method,
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 200 || response.status === 422) {
    return response.json();
  }
  throw new Error("Request could not be completed.");
};
