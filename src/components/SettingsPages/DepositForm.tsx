// src/components/DepositForm.tsx
import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { useSelector } from "react-redux";
import { AccountsData, AppState } from "../../actions/types";
import { client } from "./CoinPayments";
import { CryptoCard } from "./CryptoCard";
import { useNavigate, useParams } from "react-router-dom";

const iconPath = "/cryptoIcons/";

const DepositForm: React.FC = () => {
  const { coin } = useParams();
  if (!coin) {
    return <div>No Coin Found</div>;
  }
  const navigate = useNavigate();
  //CoinPayments
  const fetchCoinPayments = async () => {
    const response = await client.getBasicInfo();
    console.log("response to CoinPayments", response);
  };
  useEffect(() => {
    fetchCoinPayments();
  }, []);

  const paymentValues = [150, 200, 300, 500];

  const paymentComponent = () => {
    return (
      <div className="flex flex-row">
        {paymentValues.map((value, index) => (
          <div
            key={index}
            className="bg-gray-600 px-2 py-1 mr-2 rounded-sm cursor-pointer text-sm text-tBase font-bold hover:bg-gray-300"
            onClick={() => setAmount(value)}
          >
            {value}$
          </div>
        ))}
      </div>
    );
  };

  // Assuming userId is stored in Redux store under users.currentUser.id
  const userId = sessionStorage.getItem("id");
  const accountNo = useSelector(
    (state: AppState) => state.accounts.accounts
  ).find((account: AccountsData) => account.accountType === "real")?.accNo;
  // Local state for form fields
  const [amount, setAmount] = useState<number>(0);

  // State for handling feedback
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (!userId) {
      setErrorMessage("User not authenticated.");
      return;
    }

    if (!accountNo || !amount) {
      setErrorMessage("Please provide all required fields.");
      return;
    }

    if (amount <= 0) {
      setErrorMessage("Deposit amount must be greater than zero.");
      return;
    }

    setLoading(true);
    const sourceCurrency = coin;
    const currency = "USD";
    try {
      // Call the createDeposit API
      const response = await API.createDeposit(
        userId,
        accountNo,
        amount,
        currency,
        sourceCurrency
      );
      console.log("response", response.data);
      const paymentId = response.data.payment_id;
      navigate(`/settings/deposit/confirm/${paymentId}`);
      setAmount(0);
    } catch (error: any) {
      // Handle errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log("Error", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 gap-6">
      <div className="col-span-1">
        <CryptoCard
          title={coin.toUpperCase()}
          icon={<img src={`${iconPath}${coin}.svg`} alt={coin} />}
          maxAmount={100000}
          minAmount={10}
        />
      </div>
      <div className="flex flex-col col-span-2">
        <h2 className="text-lg font-bold mb-4 text-white">Deposit Funds</h2>
        {successMessage && (
          <div className="mb-4 p-3 bg-green-500 text-white rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Number Field */}
          {/* Amount Field */}
          <div>
            <label htmlFor="amount" className="block text-xs text-white mb-1">
              Amount (USD)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Enter amount to deposit"
              required
              min="0.01"
              step="0.01"
            />
          </div>
          {paymentComponent()}
          {/* Submit Button */}
          {errorMessage && (
            <div className=" text-red-600 text-xs italic rounded">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded cursor-pointer ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Deposit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
