import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { NAV_ITEMS } from "../constants/navigation";
import { PROCUREMENTSTAFF, SITEMANAGER, SUPPLIER, ADMIN } from "../constants";

const SENIOR = "SENIORSTAFF";

const roleToKey = {
  [PROCUREMENTSTAFF]: "PROCUREMENTSTAFF",
  [SITEMANAGER]: "SITEMANAGER",
  [ADMIN]: "ADMIN",
  [SUPPLIER]: "SUPPLIER",
  [SENIOR]: "SENIOR",
};

/**
 * AppSidebar — single collapsible sidebar driven by role.
 * `isOpen` controls whether the expanded (w-64) or collapsed (w-14) width is shown.
 */
const AppSidebar = ({ isOpen }) => {
  const role = useSelector((state) => state.user?.user?.role);
  const location = useLocation();
  const navKey = roleToKey[role];
  const items = navKey ? (NAV_ITEMS[navKey] ?? []) : [];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-blue-900 text-white z-30 flex flex-col transition-all duration-300 overflow-hidden ${
          isOpen ? "w-64" : "w-14"
        }`}>
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ul className="space-y-1">
            {items.map(({ label, to, icon }) => {
              const active = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    title={!isOpen ? label : undefined}
                    className={`flex items-center h-11 pr-6 border-l-4 transition-colors duration-150 ${
                      active
                        ? "border-blue-400 bg-blue-800 text-white"
                        : "border-transparent hover:bg-blue-800 hover:border-blue-500 text-blue-100"
                    }`}>
                    <span className="inline-flex justify-center items-center ml-4 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={icon}
                        />
                      </svg>
                    </span>
                    <Transition
                      show={isOpen}
                      enter="transition-opacity duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <span className="ml-3 text-sm tracking-wide truncate whitespace-nowrap">
                        {label}
                      </span>
                    </Transition>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {isOpen && (
          <p className="mb-14 px-5 py-3 text-center text-xs text-blue-300">
            Procurement Construction Industry @2022
          </p>
        )}
      </aside>
    </>
  );
};

export default AppSidebar;
