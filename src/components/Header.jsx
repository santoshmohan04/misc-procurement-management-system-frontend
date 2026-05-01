import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiCategory } from "react-icons/bi";

import userRequest from "../api/User/user.request";
import useFetchUserProfile from "../hooks/useFetchUserProfile";
import { PROCUREMENTSTAFF, SITEMANAGER, SUPPLIER, ADMIN } from "../constants";

const Header = ({ onToggleSidebar }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [mobNavHeight, setMobNavHeight] = useState(1000);
  const mobNav = useRef(null);
  const role = useSelector((state) => state.user?.user?.role);

  useFetchUserProfile();

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const navs = [
    {
      name: "Dashboard",
      url: "/dashboard",
      role: [PROCUREMENTSTAFF, ADMIN, SUPPLIER, SITEMANAGER],
    },
    {
      name: "Purchase Order",
      url: "/order",
      role: [SITEMANAGER],
    },
    {
      name: "User Management",
      url: "/users",
      role: [ADMIN],
    },
    {
      name: "Delivery",
      url: "/deliveryStatus",
      role: [SUPPLIER],
    },
    {
      name: "Approvals",
      url: "/request",
      role: [PROCUREMENTSTAFF],
    },
    {
      name: "Home",
      url: "/home",
      role: [PROCUREMENTSTAFF, ADMIN, SUPPLIER, SITEMANAGER],
    },
    {
      name: "About Us",
      url: "/about",
      role: [PROCUREMENTSTAFF, ADMIN, SUPPLIER, SITEMANAGER],
    },
    {
      name: "Terms & con",
      url: "/term",
      role: [PROCUREMENTSTAFF, ADMIN, SUPPLIER, SITEMANAGER],
    },
  ];

  const logout = () => userRequest.logout();

  useEffect(() => {
    setMobNavHeight(mobNav.current.clientHeight);
  }, [role]);

  return (
    <>
      <div className="relative z-50 w-full mx-auto border-b border-black/15">
        <div className="bg-white w-full max-w-7xl mx-auto flex justify-between gap-8 px-4 sm:px-8 items-center h-14 font-semibold text-md">
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
                className="p-1.5 rounded hover:bg-gray-100 text-gray-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            <Link
              className="no-underline font-bold text-xl text-black tracking-tighter"
              to="/">
              Procurement Construction Industry
            </Link>
          </div>
          <div className="hidden lg:flex gap-3 items-center">
            {navs.map((nav, key) =>
              nav.role.includes(role) ? (
                <NavLink
                  key={key}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-semibold text-sm no-underline"
                      : "text-slate-500 text-sm no-underline"
                  }
                  to={nav.url}>
                  {nav.name}
                </NavLink>
              ) : null,
            )}
            <button
              onClick={logout}
              className="flex items-center text-white bg-black py-1 px-3 rounded">
              Logout
            </button>
          </div>
          <BiCategory
            onClick={toggleMobileNav}
            className={`${
              isMobileNavOpen ? "-rotate-45" : "rotate-0"
            } text-black block lg:hidden transition duration-500 cursor-pointer`}
            size={"1.8rem"}
          />
        </div>
      </div>
      <div
        ref={mobNav}
        style={{
          transform: `translateY(${
            isMobileNavOpen ? 0 : `-${mobNavHeight}px`
          })`,
        }}
        className={`flex z-40 py-2 absolute mt-14 top-0 w-full bg-white transition duration-500 flex-col items-center border-b border-black/10 rounded-b-xl`}>
        {navs.map((nav, key) =>
          nav.role.includes(role) ? (
            <NavLink
              key={key}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold p-2 my-1 no-underline"
                  : "text-slate-500 p-2 my-1 no-underline"
              }
              to={nav.url}>
              {nav.name}
            </NavLink>
          ) : null,
        )}
        <button
          onClick={logout}
          className="flex items-center text-rose-500 my-1 p-2 rounded">
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
