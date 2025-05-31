import React from "react";
import { Navigate } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

function PrivateRoute({ children, isLoggedin }) {
  return isLoggedin ? children : <Navigate to="/login" replace />;
}

export default withAuth(PrivateRoute);
