import React,{useState} from "react";
import { LayoutDashboard, LineChart, StickyNote, Layers, Calendar, Settings } from "lucide-react";
import Drawer, { DrawerItems } from "./Drawer"
export type SidebarType = {
  className?: string;
};

const Sidebar: React.FC<SidebarType> = ({ }) => {
  const [activeItem, setActiveItem] = useState<string>("TRADE");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  return (
    
    <div className="flex">
        <Drawer > 
          <DrawerItems active={activeItem === "TRADE"} onClick={() => handleItemClick("TRADE")} icon={<LineChart className="text-tBase" size={25} />} text="TRADE"  />
          <DrawerItems active={activeItem === "SUPPORT"} onClick={() => handleItemClick("SUPPORT")} icon={<LayoutDashboard  className="text-tBase"  size={25} />} text="SUPPORT"  />
          <DrawerItems active={activeItem === "ACCOUNT"} onClick={() => handleItemClick("ACCOUNT")} icon={<StickyNote className="text-tBase"   size={25} />} text="ACCOUNT"  />
          <DrawerItems active={activeItem === "MATCHES"} onClick={() => handleItemClick("MATCHES")} icon={<Calendar  className="text-tBase"  size={25} />} text="MATCHES" />
          <DrawerItems active={activeItem === "MARKET"} onClick={() => handleItemClick("MARKET")} icon={<Layers  className="text-tBase"  size={25} />} text="MARKET" />
          <hr className="my-3" />
          <DrawerItems active={activeItem === "SETTINGS"} onClick={() => handleItemClick("SETTINGS")} icon={<Settings size={25} />} text="Settings" />
        </Drawer>
      </div>
  );
};

export default Sidebar;
