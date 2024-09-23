import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import TradesTable from "./TradesTable";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("deposit");

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div>
            <AccountSettings />
          </div>
        );
      case "deposit":
        return <div>Deposit Section</div>;
      case "withdrawal":
        return <div>Withdrawal Section</div>;
      case "transactions":
        return <div>Transactions Section</div>;
      case "tradeHistory":
        return (
          <div>
            <TradesTable />
          </div>
        );
      default:
        return <div>Deposit Section</div>;
    }
  };

  return (
    <div className="flex flex-col items-center p-8 pt-0">
      {/* Tab Bar */}
      <div className="bg-secondary w-full rounded-md shadow-md p-2 ">
        {/* Tabs */}
        <div className="flex  justify-between border-b-2 mb-4 bg-gray-700 rounded-md">
          <div className="p-1">
            <button
              className={`bg-gray-700 p-2 text-sm text-tBase font-bold rounded-md  hover:cursor-pointer ${
                activeTab === "deposit" ? "brightness-125 " : ""
              }`}
              onClick={() => setActiveTab("deposit")}
            >
              Deposit
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md  hover:cursor-pointer ${
                activeTab === "withdrawal" ? "brightness-125 " : ""
              }`}
              onClick={() => setActiveTab("withdrawal")}
            >
              Withdrawal
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md  hover:cursor-pointer ${
                activeTab === "transactions" ? "brightness-125 " : ""
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md  hover:cursor-pointer ${
                activeTab === "account" ? "brightness-125 " : ""
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md  hover:cursor-pointer ${
                activeTab === "tradeHistory" ? "brightness-125 " : ""
              }`}
              onClick={() => setActiveTab("tradeHistory")}
            >
              Trade History
            </button>
          </div>
          <div className="flex gap-5 text-tBase">
            <div>My current Currency</div>
            <div>Available for withdrawal</div>
            <div>In the account</div>
          </div>
        </div>

        {/* Tab Content */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
