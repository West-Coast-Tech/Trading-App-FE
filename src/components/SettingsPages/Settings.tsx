import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AccountsData, AppState } from "../../actions/types";

const Settings: React.FC = () => {
  const [toggleDropDown,setToggleDropDown] = useState<boolean>(false)
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
    <>
    <div className="flex flex-col items-center p-8 pl-3 ml-3 pt-1 bg-secondary ">
      <div className="w-full rounded-md p-2 ">
        <div className="flex justify-between border-b-2 mb-4">

 
  {/* Dropdown for small screens */}
  {/* <div className="block md:hidden p-1 bg-gray-700 rounded-md ">
<select
  className="w-full p-2 text-sm font-bold bg-gray-700 text-tBase rounded-md cursor-pointer"
  onChange={(e) => handleTabClick(e.target.value)}
  value={activeTab}
>
  <option value="deposit" className="bg-gray-400">Deposit</option>
  <option value="withdrawal">Withdrawal</option>
  <option value="transactions">Transactions</option>
  <option value="account">Account</option>
  <option value="tradeHistory">Trade History</option>
</select>
</div>  */}





   <div className="block md:hidden p-1 bg-gray-700 rounded-md">
    
<div className="relative inline-block text-left">
  <div>
    <button type="button" onClick={(e)=>setToggleDropDown(!toggleDropDown)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
      {activeTab}
      <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
  {toggleDropDown && <div className="absolute  mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
    <ul className="py-1" role="none">
      {/* Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" */}
      <li className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0" onClick={() => handleTabClick("deposit")}>Deposit</li>
      <li className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1" onClick={() => handleTabClick("withdrawal")}>Withdrawal</li>
      <li className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-2" onClick={() => handleTabClick("transactions")}>Transactions</li>
      <li className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-2" onClick={() => handleTabClick("account")}>Account</li>
      <li className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-2" onClick={() => handleTabClick("tradeHistory")}>TradeHistory</li>


    </ul>
  </div>}
</div>


   </div>




  {/* Buttons for larger screens */}
  <div className="hidden md:flex p-1 bg-gray-700 rounded-md space-x-5 [&>*]:cursor-pointer">
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





          <div className="hidden lg:flex gap-5 text-gray-500 items-center text-sm sm:hidden">
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


   
<div>
  <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
    </svg>
  </button>
  {/* Dropdown menu */}
  <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
  </div>
</div>


</>

  );
};

export default Settings;







    {/* Dropdown for small screens */}
{/* <div className="block md:hidden p-4 bg-gray-800 rounded-md shadow-md">
  <p className="text-sm font-semibold text-white mb-2">Select an Option</p>
  <ul className="space-y-2">
    <li
      className={`p-3 text-sm font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 ${
        activeTab === "deposit" ? "brightness-125" : ""
      }`}
      onClick={() => handleTabClick("deposit")}
    >
      Deposit
    </li>
    <li
      className={`p-3 text-sm font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 ${
        activeTab === "withdrawal" ? "brightness-125" : ""
      }`}
      onClick={() => handleTabClick("withdrawal")}
    >
      Withdrawal
    </li>
    <li
      className={`p-3 text-sm font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 ${
        activeTab === "transactions" ? "brightness-125" : ""
      }`}
      onClick={() => handleTabClick("transactions")}
    >
      Transactions
    </li>
    <li
      className={`p-3 text-sm font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 ${
        activeTab === "account" ? "brightness-125" : ""
      }`}
      onClick={() => handleTabClick("account")}
    >
      Account
    </li>
    <li
      className={`p-3 text-sm font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 ${
        activeTab === "tradeHistory" ? "brightness-125" : ""
      }`}
      onClick={() => handleTabClick("tradeHistory")}
    >
      Trade History
    </li>
  </ul>
</div> */}