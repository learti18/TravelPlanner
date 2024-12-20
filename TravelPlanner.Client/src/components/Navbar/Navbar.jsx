// Navbar.jsx
import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { Plane } from "lucide-react";

const Navbar = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  navigation,
  className,
}) => {
  return (
    <header className={`inset-x-0 top-0 z-50 ${className}`}>
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-5 lg:px-8 "
      >
        <div className="flex items-center gap-1 lg:flex-1">
          <Plane />
          <Link to="/" className="font-bold text-2xl">
            TripPlanner
          </Link>
        </div>
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
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
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
          <NavLink className="text-sm/6 font-semibold">
            Log in <span aria-hidden="true">&rarr;</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
