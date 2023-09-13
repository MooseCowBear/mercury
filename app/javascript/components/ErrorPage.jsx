import React from "react";
import { Link } from "react-router-dom";

export default ErrorPage = () => {
  return (
    <div>
      <h1>The route you're looking for doesn't exist.</h1>
      <Link to="/chat">Go back</Link>
    </div>
  );
};
