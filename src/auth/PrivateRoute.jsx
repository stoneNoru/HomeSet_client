import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/checkToken";

const PrivateRoute = ({ childeren }) => {
  return isAuthenticated() ? childeren : <Navigate to={"/login"} />;
};

export default PrivateRoute;
