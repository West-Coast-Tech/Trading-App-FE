import React, { useState } from "react";
import API from "../../utils/API";
import "react-toastify/dist/ReactToastify.css";
import { AccountsData, AppState } from "../../actions/types";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const selectAccount = (state: AppState) =>
  state.accounts.accounts.find(
    (account: AccountsData) => account.accountType === "real"
  );

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const account = useSelector(selectAccount);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const currency = "USD";
      const userId = sessionStorage.getItem("id") || "";
      const token = sessionStorage.getItem("token") || "";
      console.log(
        "Creating withdrawal request",
        token,
        amount,
        currency,
        userWalletAddress
      );
      const response = await API.createWithdrawalRequest(
        token,
        userId,
        amount,
        currency,
        userWalletAddress
      );
      console.log("response error");
      console.log("response", response);
      if (!response) {
        toast.error("Failed to generate withdrawal request");
      }
      if (response.status == 200) {
        console.log("Withdrawal request created successfully", response);
        toast.success("Withdrawal request created successfully");
      } else {
        toast.error("Failed to create withdrawal request");
      }
    } catch (error: any) {
      console.log("catch error");
      toast.error(
        `Failed to create withdrawal request ${error.response.data.message}`
      );
      console.error(error);
    }
  };
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 text-tBase">
      <Toaster />
      <div className="col-span-1 grid grid-cols-1 sm:grid-cols-3 grid-rows-1 md:gap-6">
        <div className="col-span-1 flex flex-col p-1 md:border-r border-dashed border-gray-500 bg-slate-700 sm:bg-transparent">
          <h4>Account</h4>
          <div className="p-1 border-b border-solid border-gray-500 px-4 mx-3">
            <p className="text-xs">In the Account</p>
            <h3>{account?.equity} $</h3>
          </div>
          <div className="p-1 border-b border-solid border-gray-500 px-4 mx-3">
            <p className="text-xs">Available for withdrawal</p>
            <h3>{account?.equity} $</h3>
          </div>
          <div className="p-1 px-4 mx-3">
            <p className="text-xs">Bonus</p>
            <h3>0.00 $</h3>
          </div>
        </div>
        <form className="col-span-2 flex flex-col p-1" onSubmit={handleSubmit}>
          <h4>Withdraw Funds</h4>
          <div className="">
            <input
              type="text"
              placeholder="Enter Amount in USD"
              className="p-2 rounded-md "
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Enter Wallet Address"
              className="p-2 rounded-md mt-2 "
              value={userWalletAddress}
              required
              onChange={(e) => setUserWalletAddress(e.target.value)}
            />
            <br />
            <button
              className="text-sm bg-green-500 rounded-md mt-3 p-2 cursor-pointer active:scale-95 active:border-solid text-white font-bold"
              type="submit"
            >
              Withdraw
            </button>
          </div>
        </form>
        <div className="col-span-full hidden">History</div>
      </div>
      <div className="col-span-1 hidden"> FAQs</div>
    </div>
  );
};

export default Withdrawal;
