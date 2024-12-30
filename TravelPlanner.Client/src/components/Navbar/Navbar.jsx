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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login page
  };

  // Update useEffect to listen for storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
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

  // Use navigation directly without filtering
  const navLinks = navigation;

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

        {/* Conditional Login/Logout Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold hover:text-red-500 duration-150 ease-linear"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-semibold hover:text-blue-500 duration-150 ease-linear"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
