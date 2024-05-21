import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/checkToken";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return isAuthenticated() ? childeren : <Navigate to={"/login"} />;
};

export default PrivateRoute;