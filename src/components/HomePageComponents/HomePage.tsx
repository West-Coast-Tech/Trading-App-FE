import {useState} from "react"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"

import SymbolBar from "../SymbolBar/SymbolBar";

import IncrementalChart from "../AmChart/IncrementalChart";
import { IceCream } from "lucide-react";


const HomePage = () => {
  const [theme,setTheme] = useState("black")
  console.log("theme",theme)
  return (
    <div className={`min-h-screen grid font-roboto grid-cols-[5rem_auto_12.5rem] grid-rows-[auto_1fr] bg-primary text-tBase theme-${theme} `}>
      <div className="col-span-1 row-span-2 z-50 ">
        <Sidebar />
      </div>

      <div className="col-span-2 row-span-1 p-2 pr-2 pl-4 md:col-span-1 lg:col-span-2">
        <Navbar /> 
      </div>
      
      <div className="col-span-1 row-span-2 pl-1  shadow-md ">
        <SymbolBar/>
        <IncrementalChart changeTheme={setTheme} />
      </div>
      
      <div className="flex items-center flex-col border-seconday border-solid border-x-2 rounded-2xl border-y-2 col-span-1 row-span-2 p-4 shadow-md md:col-span-2 lg:col-span-1 lg:row-span-2">
        <h1 className="text-seconday text-lg ">Ice Bar</h1>
        <IceCream className="text-secondary" size={150}></IceCream>
      </div>
    </div>


  );
};

export default HomePage;