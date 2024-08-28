import Sidebar from "./Sidebar";
import Navbar from "./Navbar"

import SymbolBar from "../SymbolBar/SymbolBar";

import LightweightChart from "../TradeviewChart/LightweightChart copy";
import HighCharts from "../TradeviewChart/HighChart";
import IncrementalChart from "../AmChart/IncrementalChart";
import { IceCream } from "lucide-react";

const HomePage = () => {
  
  return (
    <div className="min-h-screen grid font-roboto grid-cols-[6rem_1fr_12rem] grid-rows-[auto_1fr] text-gray-900 dark:bg-[#010005] dark:text-gray-300 md:grid-cols-[6rem_1fr] md:grid-rows-[auto_1fr_auto] lg:grid-cols-[6rem_1fr_12rem] lg:grid-rows-[auto_1fr]">
  <div className="col-span-1 row-span-2 z-50 shadow-md">
    <Sidebar />
  </div>

  <div className="col-span-2 row-span-1 p-2 pr-2 pl-4 md:col-span-1 lg:col-span-2">
    <Navbar />
  </div>
  
  <div className="col-span-1 row-span-2 pl-5 shadow-md md:col-span-2 md:row-span-1 lg:col-span-1 lg:row-span-2">
    <IncrementalChart />
  </div>
  
  <div className="flex items-center flex-col border-white border-solid border-x-2 rounded-2xl border-y-2 col-span-1 row-span-2 p-4 shadow-md md:col-span-2 lg:col-span-1 lg:row-span-2">
    <h1 className="text-white text-lg">Ice Bar</h1>
    <IceCream size={150}></IceCream>
  </div>
</div>


  );
};

export default HomePage;