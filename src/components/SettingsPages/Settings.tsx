import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AccountsData, AppState } from "../../actions/types";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accountsData = useSelector(
    (state: AppState) => state.accounts.accounts
  );
  const [activeTab, setActiveTab] = useState("");
  const [realAccount, setRealAccount] = useState<AccountsData>();

  useEffect(() => {
    const currentTab = location.pathname.split("/").pop();
    if (currentTab) setActiveTab(currentTab);
  }, [location.pathname]);
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments.length > 2) {
      setActiveTab(pathSegments[2]); // Assuming '/settings/:tab' structure
    }
  }, [location.pathname]);
  useEffect(() => {
    if (accountsData.length > 0) {
      const realAcc = accountsData.find(
        (account: AccountsData) => account.accountType === "real"
      );
      if (realAcc) setRealAccount(realAcc);
    }
  }, [accountsData]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/settings/${tab}`);
  };

  return (
    <div className="flex flex-col items-center p-8 pl-3 ml-3 pt-1 bg-secondary ">
      <div className="w-full rounded-md p-2 ">
        <div className="flex justify-between border-b-2 mb-4">
          <div className="p-1 bg-gray-700 rounded-md space-x-5 [&>*]:cursor-pointer">
            <button
              className={`bg-gray-700 p-3 ml-2 text-sm text-tBase font-bold rounded-md ${
                activeTab === "deposit" ? "brightness-125" : ""
              }`}
              onClick={() => handleTabClick("deposit")}
            >
              Deposit
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md ${
                activeTab === "withdrawal" ? "brightness-125" : ""
              }`}
              onClick={() => handleTabClick("withdrawal")}
            >
              Withdrawal
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md ${
                activeTab === "transactions" ? "brightness-125" : ""
              }`}
              onClick={() => handleTabClick("transactions")}
            >
              Transactions
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md ${
                activeTab === "account" ? "brightness-125" : ""
              }`}
              onClick={() => handleTabClick("account")}
            >
              Account
            </button>
            <button
              className={`bg-gray-700 p-3 text-sm text-tBase font-bold rounded-md ${
                activeTab === "tradeHistory" ? "brightness-125" : ""
              }`}
              onClick={() => handleTabClick("tradeHistory")}
            >
              Trade History
            </button>
          </div>

          <div className="flex gap-5 text-gray-500 items-center text-sm">
            <div className="border-r-[0.1rem] border-solid border-white px-4">
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
            <div className="border-r-[0.1rem] border-solid border-white px-4">
              <div className="text-xs font-bold">Available for withdrawal</div>
              <div className="text-center font-bold text-lg text-tBase">
                {realAccount?.equity} $
              </div>
            </div>
            <div className="pr-10">
              <div className="text-xs font-bold">In the Account</div>
              <div className="text-center font-bold text-lg text-tBase">
                {realAccount?.equity} $
              </div>
            </div>
          </div>
        </div>

        {/* Rendered content based on activeTab */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
