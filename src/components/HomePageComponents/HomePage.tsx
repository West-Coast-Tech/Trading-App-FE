import React from "react";
import IncrementalChart from "../AmChart/IncrementalChart";
import RightBar from "./RightBar/RightBar";

const HomePage = () => {
  return (
    <div className="md:flex-row text-tBase md:pr-2 flex flex-col">
      {/* Incremental Chart */}
      <div className="w-full">
        <IncrementalChart />
      </div>

      {/* Right Sidebar */}
      <div className="row-span-1">
        <RightBar />
      </div>
    </div>
  );
};

export default HomePage;
