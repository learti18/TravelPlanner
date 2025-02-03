import { React, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/Mobilemenu";
import Footer from "../footer/Footer";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname.includes("/dashboard");
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        
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
        setIsAdmin(roles.includes("Admin"));
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Check initial status
    checkAdminStatus();

    // Listen for auth changes
    window.addEventListener('auth-change', checkAdminStatus);
    
    // Cleanup
    return () => {
      window.removeEventListener('auth-change', checkAdminStatus);
    };
  }, []);

  // Re-check admin status whenever token changes
  useEffect(() => {
    checkAdminStatus();
  }, [localStorage.getItem("token")]);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/list-destinations" },
    { name: "My trips", path: "/my-trips" },
    ...(isAdmin ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <div>
      {isDashboard ? null : (
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigation={navigation}
          className={`${
            isHomePage
              ? "bg-transparent text-white absolute"
              : "border border-b bg-white text-black sticky"
          }`}
        />
      )}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
      />
      {/* Adjust padding here */}
      {/* <main className={`${isHomePage ? '': 'pt-16'}`}> */}
      <Outlet />
      {/* </main> */}
      <Footer />
    </div>
  );
}
