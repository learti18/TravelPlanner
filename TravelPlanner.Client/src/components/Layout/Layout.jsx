import { React, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/Mobilemenu";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/list-destinations" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Login", path: "/login" },
  ];

  return (
    <div>
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
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
      />
      {/* Adjust padding here */}
      {/* <main className={`${isHomePage ? '': 'pt-16'}`}> */}
      <Outlet />
      {/* </main> */}
    </div>
  );
}
