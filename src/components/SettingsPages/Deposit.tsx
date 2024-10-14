// src/components/DepositForm.tsx
import React, { useState } from "react";
import API from "../../utils/API";
import { useSelector } from "react-redux";
import { AccountsData, AppState } from "../../actions/types";
const DepositForm: React.FC = () => {
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

    try {
      // Call the createDeposit API
      const response = await API.createDeposit(userId, accountNo, amount);

      // Handle successful response
      setSuccessMessage("Deposit successful!");
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
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Deposit Funds</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account Number Field */}

        {/* Amount Field */}
        <div>
          <label htmlFor="amount" className="block text-white mb-1">
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

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
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
  );
};

export default DepositForm;
