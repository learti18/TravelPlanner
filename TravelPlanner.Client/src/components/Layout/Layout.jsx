import { React, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/Mobilemenu";
import Footer from "../footer/Footer";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname.includes("/dashboard");

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/list-destinations" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div>
      { isDashboard ? null :
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
    }
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
      />
      {/* Adjust padding here */}
      {/* <main className={`${isHomePage ? '': 'pt-16'}`}> */}
      <Outlet/>
      {/* </main> */}
      <Footer/>
    </div>
  );
}
