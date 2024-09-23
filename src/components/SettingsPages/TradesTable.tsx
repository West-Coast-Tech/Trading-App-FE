// TradesTable.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../actions/types";
import { fetchTrades } from "../../actions/tradeActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowDown,
  faCircleArrowUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import TradeInfoModal from "./TradeInfoModal";
import { TradesData } from "../../actions/types";

const TradesTable: React.FC = () => {
  const dispatch = useDispatch<any>();
  const trades = useSelector((state: AppState) => state.trades.allTrades);
  const loading = useSelector((state: AppState) => state.trades.loading);
  const error = useSelector((state: AppState) => state.trades.error);

  // Initialize fromDate to one year ago and toDate to today
  const getDefaultFromDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const getDefaultToDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [fromDate, setFromDate] = useState<string>(getDefaultFromDate());
  const [toDate, setToDate] = useState<string>(getDefaultToDate());
  const [accountType, setAccountType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTrade, setSelectedTrade] = useState<TradesData | null>(null);

  // Fetch all trades once when the component mounts
  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  // Function to format ISO date strings
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
  };

  // Handle Info Icon Click
  const handleInfoClick = (trade: TradesData) => {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  // Handle Modal Close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrade(null);
  };

  // Apply Filters Handler
  const [filters, setFilters] = useState({
    fromDate: getDefaultFromDate(),
    toDate: getDefaultToDate(),
    accountType: "",
  });

  const handleApplyFilters = () => {
    setFilters({
      fromDate,
      toDate,
      accountType,
    });
  };

  // Memoized Filtered Trades
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const tradeDate = new Date(trade.openingTime);
      const from = new Date(filters.fromDate);
      const to = new Date(filters.toDate);
      const withinDateRange = tradeDate >= from && tradeDate <= to;
      const matchesAccountType =
        filters.accountType === "" || trade.accountType === filters.accountType;
      return withinDateRange && matchesAccountType;
    });
  }, [trades, filters]);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="fromDate" className="block text-sm mb-1">
              From:
            </label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm mb-1">
              To:
            </label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="accountType" className="block text-sm mb-1">
              Account Type:
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            >
              <option value="">All Accounts</option>
              <option value="demo">Demo Account</option>
              <option value="real">Real Account</option>
              {/* Add more account types as necessary */}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase text-center bg-gray-700">
            <tr>
              <th className="py-3">Asset</th>
              <th className="py-3">Ticket No</th>
              <th className="py-3">Info</th>
              <th className="py-3">Opening Quote</th>
              <th className="py-3">Closing Quote</th>
              <th className="py-3">IP</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Income</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {loading && (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading trades...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-red">
                  Error: {error}
                </td>
              </tr>
            )}
            {!loading && !error && filteredTrades.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No trades found for the selected filters.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              filteredTrades
                .slice()
                .reverse()
                .map((tx: TradesData) => (
                  <tr
                    key={tx.ticketNo}
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <td className="px-6 py-4">{tx.symbol}</td>
                    <td className="px-6 py-4">{tx.ticketNo}</td>
                    <td className="px-6 py-4 text-center">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className=" hover:cursor-pointer"
                        onClick={() => handleInfoClick(tx)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <strong>{tx.openingPrice}</strong>
                      <p className="text-[0.7rem]">
                        {formatDate(tx.openingTime)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <strong>{tx.closingPrice}</strong>
                      <p className="text-[0.7rem]">
                        {formatDate(tx.closingTime)}
                      </p>
                    </td>
                    <td className="px-6 py-4">{tx.ipAddress || "-"}</td>
                    <td className="flex items-center text-center py-9 justify-center">
                      {tx.tradeDirection === "down" ? (
                        <FontAwesomeIcon
                          color="red"
                          icon={faCircleArrowDown}
                          className="mr-2"
                          aria-label="Trade Direction Down"
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-green-600 mr-2"
                          icon={faCircleArrowUp}
                          aria-label="Trade Direction Up"
                        />
                      )}
                      <span
                        className={`text-sm ${
                          tx.tradeDirection === "up"
                            ? "text-green-500"
                            : "text-red"
                        }`}
                      >
                        {tx.amountInvested} $
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm ${
                          tx.pnlValue >= 0 ? "text-green-500" : "text-red"
                        }`}
                      >
                        {tx.pnlValue !== null
                          ? `${tx.pnlValue.toFixed(2)} $`
                          : "0 $"}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Trade Info Modal */}
      <TradeInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        trade={selectedTrade}
      />
    </div>
  );
};

export default TradesTable;
