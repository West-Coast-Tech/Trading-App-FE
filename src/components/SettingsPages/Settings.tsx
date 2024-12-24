import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { AccountsData, AppState } from "../../actions/types";

const Settings: React.FC = () => {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const accountsData = useSelector(
    (state: AppState) => state.accounts.accounts
  );
  const [activeTab, setActiveTab] = useState("");
  const [realAccount, setRealAccount] = useState<AccountsData>();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    setToggleDropDown(false);
    navigate(`/settings/${tab}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef?.current?.contains(event.target as Node)
    ) {
      setToggleDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-8 xl:ml-4 pt-1 bg-secondary min-h-[70vh]">
        <div className="w-full rounded-md p-2 ">
          <div className="flex justify-between border-b-2 mb-4">
            {/* Dropdown for small screens */}
            <div className="block md:hidden p-1 bg-gray-700 rounded-md">
              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setToggleDropDown(!toggleDropDown)}
                    className="inline-flex items-center justify-between capitalize gap-x-1 w-[10rem] rounded-md text-white bg-[#494f65] px-4 py-3  text-sm font-bold shadow-sm ring-1 ring-inset ring-gray-300"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {activeTab}
                    <svg
                      className={`-mr-1 size-5 text-gray-400 transform transition-transform duration-500 ${
                        toggleDropDown ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {toggleDropDown && (
                  <div
                    className="absolute left-0 z-10 mt-2 w-[10rem] rounded-md bg-[#494f65] shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <ul
                      className="px-0 cursor-pointer divide-y divide-gray-600"
                      role="none"
                    >
                      {/* Active: "bg-gray-100 text-gray-900 outline-none", Not Active: "text-gray-700" */}
                      <li
                        className={`block px-4 pb-2  text-white text-sm font-bold hover:text-blue-400 transition-all duration-300`}
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                        onClick={() => handleTabClick("deposit")}
                      >
                        Deposit
                      </li>
                      <li
                        className={`block px-4 py-2  text-white text-sm font-bold hover:text-blue-400 transition-all duration-300`}
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-1"
                        onClick={() => handleTabClick("withdrawal")}
                      >
                        Withdrawal
                      </li>
                      <li
                        className={`block px-4 py-2  text-white text-sm font-bold hover:text-blue-400 transition-all duration-300`}
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-2"
                        onClick={() => handleTabClick("transactions")}
                      >
                        Transactions
                      </li>
                      <li
                        className={`block px-4 py-2  text-white text-sm font-bold hover:text-blue-400 transition-all duration-300`}
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-2"
                        onClick={() => handleTabClick("account")}
                      >
                        Account
                      </li>
                      <li
                        className={`block px-4 pt-2  text-white text-sm font-bold hover:text-blue-400 transition-all duration-300`}
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-2"
                        onClick={() => handleTabClick("tradeHistory")}
                      >
                        TradeHistory
                      </li>
                    </ul>
                  </div>
                )}
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
                <div className="text-xs font-bold">
                  Available for withdrawal
                </div>
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
    </>
  );
};

export default Settings;
