import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode the token and check if it is expired
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Try different role claim formats
    let userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    if (!userRoles) {
      userRoles = decodedToken['role'];
    }
    
    if (!userRoles) {
      const rolesString = decodedToken['roles'];
      if (rolesString) {
        try {
          userRoles = JSON.parse(rolesString);
        } catch (e) {
          console.error('Error parsing roles:', e);
        }
      }
    }

    // Convert to array if it's a single role
    const roles = Array.isArray(userRoles) ? userRoles : [userRoles];
    const isAdmin = roles.includes("Admin");

    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }

    return <Component />;
  } catch (error) {
    console.error("Error processing token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
