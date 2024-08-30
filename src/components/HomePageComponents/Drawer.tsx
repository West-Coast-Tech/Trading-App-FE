import { MoreVertical, Menu, X } from "lucide-react";
import profile from "../../assets/star.svg";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface DrawerContextType {
    expanded: boolean;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

interface DrawerProps {
    children: ReactNode;
}

export default function Drawer({ children }: DrawerProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    console.log(children)
    return (
        <>
            <aside className={`bg-primary min-h-screen z-30 `}>
                <nav className="h-full flex flex-col border-r shadow-sm">
                    <div className="pr-4 pl-7 pt-3 flex justify-between items-center ">
                        {/* Improved accessibility */}
                        <button 
                            onClick={() => setExpanded((curr) => !curr)} 
                            aria-expanded={expanded} 
                            className="p-1.5 rounded-lg bg-gray-100 hover:focus:outline-none cursor-pointer"
                        >
                            {expanded ? <X stroke="#ffffff"/> : <Menu stroke="#ffffff" />}
                        </button>
                    </div>
                    
                    <DrawerContext.Provider value={{ expanded }}>
                        <ul className="flex-1 items-center px-1 pr-5 mt-2">{children}</ul>
                    </DrawerContext.Provider>
                        {!expanded && (
                            <img src={profile} className="h-10 rounded-md duration-700" alt="Profile" />
                        )}
                    <div className="border-t flex p-3">
                        {/* Enhanced transition effect */}
                        <div className={`flex justify-between items-center overflow-hidden transition-all duration-700 ${expanded ? "w-40" : "w-0"}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold">Sidebar</h4>
                                <span className="text-xs text-gray-600">Elements</span>
                            </div>
                            <MoreVertical size={20} />
                        </div>
                        
                    </div>
                </nav>
            </aside>
             {/* Page Overlay and Blur Effect */}
             <div 
                className={`fixed top-0 left-0 w-full h-full transition-all duration-300 ${expanded ? 'backdrop-blur-sm bg-black bg-opacity-50' : 'pointer-events-none opacity-0'}`} 
                onClick={() => setExpanded(false)}
            ></div>
        </>
        
    );
}

interface DrawerItemsProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    onClick: React.MouseEventHandler<HTMLLIElement> | undefined;
}
export function DrawerItems({ icon, text, active, alert, onClick }: DrawerItemsProps) {
    const context = useContext(DrawerContext);

    if (!context) {
        throw new Error('DrawerItems must be used within a DrawerContext.Provider');
    }

    const { expanded } = context;

    return (
        <li onClick={onClick} className="relative flex items-center py-1 my-1 font-medium w-full pl-2 justify-center">
        <div className={`flex flex-col items-center justify-center w-8 h-[3.2rem] px-4 py-1 rounded-md cursor-pointer ${active ? "bg-gradient-to-tr from-blue-400 to-blue-800" : "hover:bg-blue-700"}`}>
            {icon}
            <div className=" text-[0.6rem] font-bold mt-1 text-center">
                {text}
            </div>
        </div>

        {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
            </div>
        )}
    </li>
    
    );
}
