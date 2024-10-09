// Layout.tsx
import React, { useState } from "react";
import Sidebar from "./HomePageComponents/Sidebar";
import Navbar from "./HomePageComponents/Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // For medium and larger screens

  return (
    <div className="min-h-screen md:min-h-screen flex bg-background font-roboto">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 transition-transform  duration-500 transform ${
          isSidebarExpanded ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-20`}
      >
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-20 flex flex-col">
        {/* Navbar */}
        <Navbar
          onHamburgerClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />

        {/* Page Content */}
        <div className="md:p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
