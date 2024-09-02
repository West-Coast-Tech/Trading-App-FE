import { useState} from "react"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"


import IncrementalChart from "../AmChart/IncrementalChart";
import RightBar from "./RightBar/RightBar";


const HomePage = () => {
  const [theme,setTheme] = useState("black")

  return (
    <div className={` theme-${theme} bg-background min-h-screen grid font-roboto grid-cols-[5rem_auto_12.5rem] grid-rows-[auto_1fr] text-tBase pr-2`}>
      <div className="col-span-1 row-span-2 z-50 ">
        <Sidebar />
      </div>

      <div className="col-span-2 row-span-1 p-2 pr-2 pl-4 md:col-span-1 lg:col-span-2">
        <Navbar /> 
      </div>
      
      <div className="col-span-1 row-span-2 pl-1  shadow-md ">
        <IncrementalChart changeTheme={setTheme} />
      </div>
      
      <div className="col-span-1 row-span-2 pb-2">
        <RightBar/>
      </div>
    </div>


  );
};

export default HomePage;