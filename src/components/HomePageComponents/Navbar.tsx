import { FunctionComponent, useEffect, useState, useRef } from "react";
import logo from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getAccounts } from "../../actions/accountActions";
import { selectAccount } from "../../features/accounts/accountSlice";
import { AccountsData, AppState } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "lucide-react";

export type NavbarType = {
  className?: string;
  onHamburgerClick: () => void;
};

const Navbar: FunctionComponent<NavbarType> = ({
  className = "",
  onHamburgerClick,
}) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const accounts = useSelector((state: AppState) => state.accounts.accounts);
  const selectedAccount = useSelector(
    (state: AppState) => state.accounts.selectedAccount
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  // Fetch accounts on mount
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  // Automatically select the first demo account found if no account is selected
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      const demoAccount = accounts.find(
        (account: AccountsData) => account.accountType === "demo"
      );
      console.log("Demo Account", demoAccount);
      if (demoAccount) {
        dispatch(selectAccount(demoAccount));
      }
    }
  }, [accounts, dispatch, selectedAccount]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  console.log("Selected Account:", selectedAccount);
  console.log("Accounts:", accounts);

  // Handler to switch accounts
  const handleAccountSwitch = (accountType: string) => {
    const account = accounts.find(
      (acc: AccountsData) => acc.accountType === accountType
    );
    if (account) {
      dispatch(selectAccount(account));
      setDropdownOpen(false);
    } else {
      console.warn(`No account found with type: ${accountType}`);
    }
  };
  // Derived matched account based on accNo
  const matchedAccount = accounts.find(
    (account: AccountsData) => account.accNo === selectedAccount?.accNo
  );
  return (
    <div
      className={`md:w-full h-[5vh] pl-5 md:pr-7 pr-3 text-tBase m-0 border-solid border-borderColor tracking-wide border-b-[0.5px] relative top-0 left-0 shrink-0 flex flex-row items-center justify-between box-border md:gap-5 text-center text-xl ${className}`}
    >
      {/* Logo Section */}
      <div className="md:flex hidden flex-row items-center justify-start">
        <div className="w-[215px] flex flex-row">
          <img
            className="h-12 relative overflow-hidden shrink-0"
            loading="lazy"
            alt="Logo"
            src={logo}
          />
          <div className="flex-1 md:flex flex-col items-start justify-start pt-[12.5px] px-0 pb-0 hidden">
            <b className="relative leading-[23px]">BINARRY</b>
          </div>
        </div>
      </div>
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden focus:outline-none" onClick={onHamburgerClick}>
        <Menu />
      </div>
      {/* Account Selector and Actions */}
      <div className="flex flex-row items-center justify-start md:gap-16 space-x-2 max-w-full">
        {/* Account Selector */}
        <div
          className="flex flex-row items-center  relative "
          ref={dropdownRef}
        >
          <div
            className="bg-secondary flex flex-row space-x-2 text-white cursor-pointer rounded-md px-3 "
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div>
              <FontAwesomeIcon icon={faPaperPlane} color="green" />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <div className="text-[0.6rem] font-extrabold uppercase">
                {matchedAccount?.accountType}{" "}
                <div className="hidden">ACCOUNT</div>
              </div>
              <div className="text-xs font-bold">
                $ {matchedAccount?.equity}
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-64 bg-secondary text-xs border border-gray-200 rounded-md shadow-md shadow-black z-50">
              <div className="flex">
                {/* Left Column */}
                <div className="p-4 border-r border-gray-200">
                  {/* Row 1: Standard Profit */}
                  <div className="mb-4">
                    <span className="font-semibold">Standard Profit:</span> 0%
                  </div>
                  {/* Row 2: Account Details */}
                  <div className="mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    Account Details
                  </div>
                  {/* Row 3: Live Account */}
                  <div
                    className="mb-4 flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleAccountSwitch("real")}
                  >
                    <span
                      className={`h-3 w-3 rounded-full mr-2 ${
                        selectedAccount?.accountType === "real"
                          ? "bg-blue-500"
                          : "bg-black"
                      }`}
                    ></span>
                    Real Account
                  </div>
                  {/* Row 4: Demo Account */}
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleAccountSwitch("demo")}
                  >
                    <span
                      className={`h-3 w-3 rounded-full mr-2 ${
                        selectedAccount?.accountType === "demo"
                          ? "bg-blue-500"
                          : "bg-black"
                      }`}
                    ></span>
                    Demo Account
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-1/2 p-4">
                  {/* You can add content for the right column here */}
                  <div className="text-white">
                    {/* Placeholder for additional details */}
                    <h3 className="font-semibold mb-2">Account Information</h3>
                    <p>Account ID: {selectedAccount?.accNo}</p>
                    <p>Equity: ${selectedAccount?.equity}</p>
                    {/* Add more details as needed */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          className="h-[1.5rem]  rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* Deposit and Withdrawal Buttons */}
        <div className="flex flex-row items-center gap-3 md:w-[12rem]">
          <div
            className="h-[2rem] rounded-md bg-green-600 flex items-center justify-center px-2 w-full cursor-pointer hover:bg-green-700"
            onClick={() => navigate("/deposit")} // Assuming you have a deposit route
          >
            <b className="text-tBase text-[0.875rem]">+ Deposit</b>
          </div>
          <div
            className="h-[2rem] hidden rounded-md bg-secondary md:flex items-center justify-center px-2 w-full cursor-pointer hover:bg-gray-700"
            onClick={() => navigate("/withdrawal")} // Assuming you have a withdrawal route
          >
            <b className="text-tBase text-[0.875rem]">Withdrawal</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
