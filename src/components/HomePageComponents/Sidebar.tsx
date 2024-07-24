import React from "react";
import { LayoutDashboard, LineChart, StickyNote, Layers, Calendar, Settings } from "lucide-react";
import Drawer, { DrawerItems } from "./Drawer"
export type SidebarType = {
  className?: string;
};

const Sidebar: React.FC<SidebarType> = ({ }) => {

  return (
    // <div
    //   className={`relative top-0 left-0 flex flex-col items-center justify-start pt-19px px-3 pb-524px gap-10px transition-all duration-300 ${className} ${isOpen ? "w-64" : "w-16"}`}
    // >
    //   <img
    //     className="w-12 h-12 relative overflow-hidden shrink-0 cursor-pointer"
    //     loading="lazy"
    //     alt="Menu"
    //     src={menuIcon}
    //     onClick={toggleSidebar}
    //   />
    //   <nav className="flex flex-col items-center justify-center py-3 px-17px gap-15px text-center text-xl text-grays-white font-inter">
    //     <div className="flex flex-col gap-8px">
    //       {navItems.map((item, index) => (
    //         <li key={index} className="flex flex-col items-center justify-start py-space-200 px-0.5">
    //           <img
    //             className="h-14 relative object-fit-contain overflow-hidden shrink-0"
    //             loading="lazy"
    //             alt=""
    //             src={item.icon}
    //           />
    //           <div className={`relative leading-100% font-extrabold inline-block min-w-54px mq450:text-base mq450:leading-16px ${isOpen ? "block" : "hidden"}`}>
    //             {item.label}
    //           </div>
    //         </li>
    //       ))}
    //     </div>
    //   </nav>
    //   <img
    //     className="w-54px h-12 absolute top-18.5px right--51px overflow-hidden shrink-0 z-1"
    //     loading="lazy"
    //     alt=""
    //     src="/diamond-1.svg"
    //   />
    // </div>
    <div className="flex ">
        <Drawer > 
          <DrawerItems icon={<LineChart color="#ffffff" size={30} />} text="Home"  active />
          <DrawerItems icon={<LayoutDashboard  color="#ffffff" size={30} />} text="Support"  />
          <DrawerItems icon={<StickyNote color="#ffffff"  size={30} />} text="Account"  />
          <DrawerItems icon={<Calendar  color="#ffffff" size={30} />} text="Tournaments" />
          <DrawerItems icon={<Layers  color="#ffffff" size={30} />} text="Market" />
          <hr className="my-3" />
          <DrawerItems icon={<Settings size={30} />} text="Settings" />
        </Drawer>
      </div>
  );
};

export default Sidebar;
