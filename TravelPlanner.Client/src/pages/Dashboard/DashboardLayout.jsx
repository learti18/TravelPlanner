import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Hotel,
  Compass,
  Settings,
  LogOut,
  HomeIcon,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Home",
    icon: <HomeIcon className="w-6 h-6"/>,
    path: "/",
  },
  {
    title: "Overview",
    icon: <LayoutDashboard className="w-6 h-6" />,
    path: "/dashboard",
  },
  {
    title: "Destinations",
    icon: <MapPin className="w-6 h-6" />,
    path: "/dashboard/destinations",
  },
  {
    title: "Settings",
    icon: <Settings className="w-6 h-6" />,
    path: "/dashboard/settings",
  },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold">Dashboard</span>
          </div>
          <div className="px-4 mt-8">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    location.pathname === item.path
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col flex-grow px-4 mt-5">
            <div className="mt-auto">
              <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900">
                <LogOut className="w-6 h-6" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto my-5">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
