import React from "react";
import { Navigate } from "react-router-dom"; // to navigate to login if not authenticated

const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode the token and check if it is expired
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const isTokenExpired = decodedToken.exp * 1000 < Date.now();

  if (isTokenExpired) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
