import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Dashboard from "../frontend/pages/Dashboard"
import ErrorPage from "../frontend/pages/ErrorPage";

export default Router = () => {
  const router = createBrowserRouter([
    {
      path: "/chat",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

// TODO: want to have the dashboard layout that will render the chat as a child