import React, { useState } from "react";
import API from "../../utils/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountsData, AppState } from "../../actions/types";
import { useSelector } from "react-redux";

const selectAccount = (state: AppState) =>
  state.accounts.accounts.find(
    (account: AccountsData) => account.accountType === "real"
  );

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const account = useSelector(selectAccount);
  const handleSubmit = async () => {
    toast.success("hanlding withdrawal request");
    try {
      const currency = "USD";
      const userId = sessionStorage.getItem("id") || "";
      const token = sessionStorage.getItem("token") || "";
      console.log("Creating withdrawal request", token, amount, currency);
      const response = await API.createWithdrawalRequest(
        userId,
        amount,
        currency,
        token
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
    } catch (error) {
      console.log("catch error");
      toast.error("Failed to create withdrawal request");
      console.error(error);
    }
  };
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 text-tBase">
      <div className="col-span-1 grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-6">
        <div className="col-span-1 flex flex-col p-1 border-r border-dashed border-gray-500">
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
            <p className="text-xs">Commission</p>
            <h3>0.00 $</h3>
          </div>
        </div>
        <div className="col-span-2 flex flex-col p-1 border-r border-dashed border-gray-500">
          <h4>Withdrawal</h4>
          <div className="">
            <input
              type="text"
              placeholder="Enter Amount in USD"
              className="p-2 rounded-md "
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <button
              className="text-sm bg-green-500 rounded-md mt-3 p-1 cursor-pointer "
              onClick={handleSubmit}
            >
              Withdraw
            </button>
          </div>
          <div></div>
        </div>
        <div className="col-span-full hidden">History</div>
      </div>
      <div className="col-span-1 hidden"> FAQs</div>
    </div>
  );
};

export default Withdrawal;
