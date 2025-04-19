import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen, navigation }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      // Dispatch auth change event
      window.dispatchEvent(new Event('auth-change'));
      navigate("/login");
    } else {
      navigate("/login");
    }
    setMobileMenuOpen(false);
  };

  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="py-6">
              <button
                onClick={handleAuthClick}
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                {isLoggedIn ? "Log out" : "Log in"}
              </button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MobileMenu;
