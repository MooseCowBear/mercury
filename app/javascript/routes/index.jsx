import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import MainScreen from "../../components/MainScreen";
import ErrorPage from "../../components/ErrorPage";

export default Router = () => {
  const router = createBrowserRouter([
    {
      path: "/chat",
      element: <MainScreen />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

// TODO: want to have the dashboard layout that will render the chat as a child

// is this going to be ok inside the frontend folder?