// Layout.tsx
import React from "react";
import Sidebar from "./HomePageComponents/Sidebar";
import Navbar from "./HomePageComponents/Navbar";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-background font-roboto">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-20 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
