import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { useSelector } from "react-redux";
import { TransactionsData } from "../../actions/types"; // Ensure this path is correct

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsData[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem("token") || "";
        const userId = sessionStorage.getItem("id") || "";

        const response = await API.getTransactions(token, userId);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusColor = (status: TransactionsData["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  };

  const getTransactionTypeColor = (
    type: TransactionsData["transactionType"]
  ) => {
    return type === "deposit"
      ? "text-blue-600 bg-blue-100"
      : "text-purple-600 bg-purple-100";
  };

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-white">Transactions</h1>
      {transactions.length === 0 ? (
        <div className="text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-gray-100 text-white border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b font-semibold text-left ">
                  Account No
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Amount
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Currency
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Transaction Type
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Source Currency
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Final Balance
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left bg-gray-100">
                  Merchant
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-200 transition-colors">
                  <td className="px-4 py-2 border-b">{tx.accountNo}</td>
                  <td className="px-4 py-2 border-b">{tx.amount}</td>
                  <td className="px-4 py-2 border-b">{tx.currency}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm ${getTransactionTypeColor(
                        tx.transactionType
                      )}`}
                    >
                      {tx.transactionType.charAt(0).toUpperCase() +
                        tx.transactionType.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{tx.sourceCurrency}</td>
                  <td className="px-4 py-2 border-b">{tx.finalBalance}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(
                        tx.status
                      )}`}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{tx.merchant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
