import React from "react";
import { Link } from "react-router-dom";

export default ErrorPage = () => {
  return (
    <div className="mx-auto text-center">
      <h1 className="text-2xl font-semibold">Well, this is embarrassing...</h1>
      <Link to="/chat">Go back</Link>
    </div>
  );
};
