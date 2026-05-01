import React, { useState } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import Cover from "../assets/images/supply.jpg";

/**
 * AppLayout — unified layout that wraps Header + collapsible AppSidebar + main content.
 * All sidebar pages should use this instead of repeating Header+Sidebar+boilerplate.
 */
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col antialiased bg-gray-50 text-gray-900">
      <Header onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      <AppSidebar isOpen={sidebarOpen} />
      <main
        className={`flex-1 pt-14 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-14"
        }`}
        style={{
          backgroundImage: `url(${Cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "calc(100vh - 3.5rem)",
        }}>
        <div className="p-6 min-h-full">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
