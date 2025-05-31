import React from "react";
import { Navigate } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

function AnonRoute({ children, isLoggedin }) {
  return !isLoggedin ? children : <Navigate to="/profile" replace />;
}

export default withAuth(AnonRoute);
