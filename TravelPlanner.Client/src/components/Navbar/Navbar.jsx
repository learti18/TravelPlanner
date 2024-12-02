// Navbar.jsx
import React from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, navigation }) => (
  <header className="absolute inset-x-0 top-0 z-50">
    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            alt="Company Logo"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
      {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="text-sm font-semibold text-gray-900"
            >
              {item.name}
            </NavLink>
          ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <NavLink className="text-sm/6 font-semibold text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </NavLink>
      </div>
    </nav>
  </header>
);

export default Navbar;
