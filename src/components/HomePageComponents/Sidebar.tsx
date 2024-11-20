import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  LineChart,
  StickyNote,
  Layers,
  Calendar,
  Settings,
} from "lucide-react";
import Drawer, { DrawerItems } from "./Drawer";
import { useNavigate, useLocation } from "react-router-dom";

export type SidebarType = {
  className?: string;
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

// Define the sidebar items in a configuration array
const sidebarItems = [
  { key: "TRADE", text: "TRADE", icon: <LineChart size={18} />, path: "/home" },
  {
    key: "SUPPORT",
    text: "SUPPORT",
    icon: <LayoutDashboard size={18} />,
    path: "/support",
  },
  {
    key: "ACCOUNT",
    text: "ACCOUNT",
    icon: <StickyNote size={18} />,
    path: "/settings/account",
  },
  {
    key: "MATCHES",
    text: "MATCHES",
    icon: <Calendar size={18} />,
    path: "/matches",
  },
  {
    key: "MARKET",
    text: "MARKET",
    icon: <Layers size={18} />,
    path: "/market",
  },
  {
    key: "SETTINGS",
    text: "SETTINGS",
    icon: <Settings size={18} />,
    path: "",
  },
];

const Sidebar: React.FC<SidebarType> = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>("TRADE");

  // Update activeItem based on the current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = sidebarItems.find((item) =>
      currentPath.startsWith(item.path)
    );
    if (currentItem) {
      setActiveItem(currentItem.key);
      sessionStorage.setItem("activeTab", currentItem.key);
    } else {
      setActiveItem("TRADE");
      sessionStorage.setItem("activeTab", "TRADE");
    }
  }, [location.pathname]);

  // // On initial render, check sessionStorage for active tab
  // useEffect(() => {
  //   const storedTab = sessionStorage.getItem("activeTab");
  //   if (storedTab) {
  //     setActiveItem(storedTab);
  //     // Navigate to the stored path if needed
  //     const storedItem = sidebarItems.find((item) => item.key === storedTab);
  //     if (storedItem && location.pathname !== storedItem.path) {
  //       navigate(storedItem.path, { replace: true });
  //     }
  //   }
  // }, []); // Run only once on mount

  const handleItemClick = (item: { key: string; path: string }) => {
    setActiveItem(item.key);
    sessionStorage.setItem("activeTab", item.key);
    navigate(item.path);
  };

  return (
    <div className="flex text-tBase">
      <Drawer
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
      >
        {sidebarItems.map((item) => (
          <DrawerItems
            key={item.key}
            active={activeItem === item.key}
            onClick={() => handleItemClick(item)}
            icon={React.cloneElement(item.icon, {
              className: "text-tBase",
              size: 18,
            })}
            text={item.text}
          />
        ))}
        <hr className="my-3" />
      </Drawer>
    </div>
  );
};

export default Sidebar;
