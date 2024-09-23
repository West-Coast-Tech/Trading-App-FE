import React from "react";
import IncrementalChart from "../AmChart/IncrementalChart";
import RightBar from "./RightBar/RightBar";

const HomePage = () => {
  return (
    <div className="grid grid-cols-[auto_12.5rem] grid-rows-[auto_1fr] text-tBase pr-2">
      {/* Incremental Chart */}
      <div className="col-span-1 row-span-2 pl-1">
        <IncrementalChart />
      </div>

      {/* Right Sidebar */}
      <div className="col-span-1 row-span-2 pb-2">
        <RightBar />
      </div>
    </div>
  );
};

export default HomePage;
