import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import MainScreen from "../../components/MainScreen"; // this will change
import ErrorPage from "../../pages/ErrorPage"; // check this
import Dashboard from "../pages/Dashboard";

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