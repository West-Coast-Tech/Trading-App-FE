import React, { useEffect, useState } from "react";
import Sidebar from "./HomePageComponents/Sidebar";
import Navbar from "./HomePageComponents/Navbar";
import { Outlet } from "react-router-dom";
import { AppState } from "../actions/types";
import { useSelector } from "react-redux";

const selectAppState = (state: AppState) => state.auth;

const Layout: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // For medium and larger screens
  const { id, isAuthenticated, token } = useSelector(selectAppState);
  console.log("id, isAuthenticated, token", id, isAuthenticated, token);
  // If session is invalid, show modal
  let sessionExpired = !isAuthenticated || !token || !id;
  useEffect(() => {
    sessionExpired = !isAuthenticated || !token || !id;
  }, [isAuthenticated, token, id]);
  // Optionally, you could add logic to refresh, but here we only instruct the user
  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen sm:min-h-screen flex bg-background font-roboto relative">
      {/* If session expired, show overlay & modal */}
      {/* {sessionExpired && (
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60">
          
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 w-[90%] sm:w-[400px] text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-300 dark:text-gray-300">
              Session Expired
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your session has expired. Please refresh the page to continue.
            </p>
            <button
              onClick={handleRefreshPage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )} */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 transition-transform duration-500 transform 
          ${
            isSidebarExpanded ? "translate-x-0" : "-translate-x-full"
          } xl:translate-x-0 w-64 xl:w-20`}
      >
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 xl:ml-20 flex flex-col w-full">
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
