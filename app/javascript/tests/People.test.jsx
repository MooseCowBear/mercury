import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import People from "../components/People";

import { makeGetRequest } from "../helpers/apiRequest";

jest.mock("../helpers/apiRequest", () => ({
  makeGetRequest: jest.fn(),
}));

jest.mock("../components/PersonCard", () => ({
  __esModule: true,
  default: () => {
    return <div data-testid="mock-person-card" />;
  },
}));

describe("People", () => {
  it("should render PersonCard when api returns successfully", async () => {
    makeGetRequest.mockReturnValueOnce(
      Promise.resolve([{ id: 1, username: "user1" }])
    );
    render(<People setCurrentRoom={() => {}} setViewPeople={() => {}} />);

    await waitFor(() => {
      screen.queryByTestId("mock-person-card");
    });
  });

  it("should render error when error", async () => {
    makeGetRequest.mockReturnValueOnce(Promise.reject(new Error("error")));

    render(<People setCurrentRoom={() => {}} setViewPeople={() => {}} />);

    await waitFor(() => {
      screen.getByText(/wrong/i);
    });
  });
});
