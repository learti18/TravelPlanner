import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";

const Navbar = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  navigation,
  className,
}) => {
  const navigate = useNavigate(); // React Router hook for navigation

  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken); // Debug log

        // First try the standard claim type
        let userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        
        // If not found, try the short form
        if (!userRoles) {
          userRoles = decodedToken['role'];
        }
        
        // If still not found, try the custom roles claim
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

        console.log('User roles found:', userRoles); // Debug log
        
        // Handle different role formats
        const roles = Array.isArray(userRoles) ? userRoles : [userRoles];
        console.log('Final roles array:', roles); // Debug log
        
        setIsAdmin(roles.includes("Admin"));
        console.log('Is admin:', roles.includes("Admin")); // Debug log
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update state
    setIsAdmin(false);
    navigate("/login"); // Redirect to login page
  };

  // Update useEffect to listen for storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      checkUserRole();
    };

    // Check initial status
    checkLoginStatus();

    // Listen for our custom auth-change event
    window.addEventListener('auth-change', checkLoginStatus);
    
    // Cleanup listener
    return () => {
      window.removeEventListener('auth-change', checkLoginStatus);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  // Filter navigation items based on user role
  const navLinks = navigation.filter(item => {
    if (item.href === "/dashboard") {
      return isAdmin;
    }
    return true;
  });

  return (
    <header className={`inset-x-0 top-0 z-50 ${className}`}>
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-5 lg:px-8"
      >
        <div className="flex items-center gap-1 lg:flex-1">
          <Plane />
          <Link to="/" className="font-bold text-2xl">
            TripPlanner
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="text-sm font-semibold hover:bg-white hover:text-black duration-150 ease-linear py-2 px-4 rounded-lg"
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold hover:bg-white hover:text-black duration-150 ease-linear py-2 px-4 rounded-lg"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-semibold hover:bg-white hover:text-black duration-150 ease-linear py-2 px-4 rounded-lg"
            >
              Log in
            </NavLink>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
