import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import MainScreen from "../components/MainScreen";
import ErrorPage from "../components/ErrorPage";

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
