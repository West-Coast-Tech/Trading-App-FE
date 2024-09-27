import React, { useEffect, useState } from "react";
import AccountSettings from "./AccountSettings";
import TradesTable from "./TradesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDollarToSlot,
  faDollarSign,
  faFilterCircleDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";
import { AccountsData, AppState } from "../../actions/types";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [realAccount, setRealAccount] = useState<AccountsData>();
  const dispatch = useDispatch<any>();
  const accountsData = useSelector(
    (state: AppState) => state.accounts.accounts
  );
  useEffect(() => {
    // Render content based on active tab
    if (accountsData.length > 0) {
      // Automatically select the first demo account found
      const realAcc = accountsData.find(
        (account: AccountsData) => account.accountType === "real"
      );
      if (realAcc) {
        setRealAccount(realAcc);
      }
    }
  });
  console.log("RealAccount", realAccount);
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
    <div className="flex flex-col items-center p-8 pl-3 ml-3 pt-1 bg-secondary ">
      {/* Tab Bar */}
      <div className=" w-full rounded-md p-2 ">
        {/* Tabs */}
        <div className="flex   justify-between border-b-2 mb-4 ">
          <div className="p-1 bg-gray-700 rounded-md space-x-5">
            <button
              className={`bg-gray-700 p-3 ml-2 text-sm text-tBase font-bold rounded-md  hover:cursor-pointer ${
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
          <div className="flex gap-5 text-gray-500 items-center text-sm ">
            <div className="border-r-[0.1rem] border-solid border-white py-1 px-4 ">
              <p className="text-xs m-1 font-bold">My current Currency</p>
              <div className="flex flex-row space-x-2 text-tBase">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="p-1 px-1.5 bg-gray-500 rounded-3xl"
                />
                <div className="font-bold">{realAccount?.currency}</div>
                <div className="hidden bg-blue-500 rounded-md text-[0.6rem] font-bold px-1.5">
                  CHANGE
                </div>
              </div>
            </div>
            <div className="border-r-[0.1rem] border-solid border-white py-1 px-4 ">
              <div className="text-xs font-bold">Available for withdrawal</div>
              <div className="text-right font-bold text-lg text-tBase">
                {realAccount?.equity}$
              </div>
            </div>
            <div className="pr-10">
              <div className="text-xs font-bold">In the Account</div>
              <div className="text-right font-bold text-lg text-tBase">
                {realAccount?.equity}$
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
