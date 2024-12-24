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
  const [accountType, setAccountType] = useState<string>("real");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTrade, setSelectedTrade] = useState<TradesData | null>(null);
  //For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

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
  const handleApplyFilters = () => {
    setFilters({
      fromDate,
      toDate,
      accountType,
    });
  };

  // Define the filters state
  const [filters, setFilters] = useState({
    fromDate: getDefaultFromDate(),
    toDate: getDefaultToDate(),
    accountType: "real",
  });

  // Helper function to parse fromDate with start of the day
  const parseFromDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 0); // 00:00:00.000
  };

  // Helper function to parse toDate with end of the day
  const parseToDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59, 999); // 23:59:59.999
  };
  // Memoized Filtered Trades
  const filteredTrades = useMemo(() => {
    return trades.filter((trade) => {
      const tradeDate = new Date(trade.openingTime);
      const from = parseFromDate(filters.fromDate);
      const to = parseToDate(filters.toDate);
      const withinDateRange = tradeDate >= from && tradeDate <= to;
      console.log(tradeDate, from, to);
      if (!trade.accountNo || !/^(\d{2})\d+$/.test(trade.accountNo)) {
        // Optionally, log or handle invalid accNo
        // console.log("trade account no", trade.accountNo);
        // console.log(
        //   "does it pass the test",
        //   !/^(\d{2})\d+$/.test(trade.accountNo)
        // );
        return false;
      }

      // Derive accountType based on accountNo prefix
      const accPrefix = trade.accountNo.substring(0, 2);
      const derivedAccountType =
        accPrefix === "45" ? "real" : accPrefix === "26" ? "demo" : "";
      const matchesAccountType =
        filters.accountType === "" ||
        derivedAccountType === filters.accountType;
      console.log(matchesAccountType, withinDateRange);
      return withinDateRange && matchesAccountType;
    });
  }, [trades, filters]);

  // Get paginated trades
  const paginatedTrades = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTrades.slice(startIndex, endIndex);
  }, [filteredTrades, currentPage, pageSize]);
  const totalPages = Math.ceil(filteredTrades.length / pageSize);

  console.log("Filtered Trdes", filteredTrades);
  return (
    <>
      <div className="pt-4 text-tBase">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="flex flex-wrap gap-4">
            {/* From Date Filter */}
            <div className="flex flex-row items-center w-full md:w-1/2 lg:w-1/4">
              <fieldset className="border border-solid border-gray-300 px-10 py-1 rounded">
                <legend className="text-xs">From</legend>
                <input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded"
                />
              </fieldset>
            </div>
            {/* To Date Filter */}
            <div className="flex flex-row items-center w-full md:w-1/2 lg:w-1/4">
              <fieldset className="border border-solid border-gray-300 px-10 py-1 rounded">
                <legend className="text-xs">To</legend>
                <input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded"
                />
              </fieldset>
            </div>
            {/* Account Type Filter */}
            <div className="flex flex-row items-center w-full md:w-1/2 lg:w-1/4">
              <fieldset className="border border-solid border-gray-300 px-10 py-1 rounded">
                <legend className="text-xs">Account Type</legend>
                <select
                  id="accountType"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded"
                >
                  <option value="real">Real Account</option>
                  <option value="demo">Demo Account</option>
                  {/* Add more account types as necessary */}
                </select>
              </fieldset>
            </div>
            {/* Apply Filters Button */}
            <div className="flex items-end w-full md:w-1/2 lg:w-1/4 ">
              <button
                onClick={handleApplyFilters}
                className="bg-blue-500 px-4 mb-2 cursor-pointer text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
          {/* Export Button */}
          {/* <div className="mt-4 sm:mt-0">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Export
          </button>
        </div> */}
        </div>

        {/* Table */}
        <div className=" overflow-auto">
          <table className="min-w-full lg:w-full text-xs text-left text-gray-400 border-collapse border-2 border-solid border-gray-600">
            <thead className="text-xs capitalize text-center bg-gray-700">
              <tr>
                <th className="py-3 border-2 border-solid border-gray-600">
                  Asset
                </th>
                <th className="py-3 border-2 border-solid border-gray-600">
                  Ticket No
                </th>
                <th className="py-3 border-2 border-solid border-gray-600">
                  Opening Quote
                </th>
                <th className="py-3 border-2 border-solid border-gray-600">
                  Closing Quote
                </th>
                <th className="py-3 border-2 border-solid border-gray-600">
                  Amount
                </th>
                <th className="py-3 border-2 border-solid border-gray-600">
                  Profit Loss
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Loading trades...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-red">
                    Error: {error}
                  </td>
                </tr>
              )}
              {!loading && !error && paginatedTrades.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No trades found for the selected filters.
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                paginatedTrades.map((tx: TradesData) => (
                  <tr
                    key={tx.ticketNo}
                    className="bg-gray-800 border-2 border-solid border-gray-600 transition-colors"
                  >
                    <td className="px-3 py-1">{tx.symbol}</td>
                    <td className="px-3 py-1 border-2 border-solid border-gray-600">
                      {tx.ticketNo}
                    </td>
                    <td className="px-3 py-1 border-2 border-solid border-gray-600">
                      <strong>{tx.openingPrice}</strong>
                      <p className="text-[0.7rem]">
                        {formatDate(tx.openingTime)}
                      </p>
                    </td>
                    <td className="px-3 py-1 border-2 border-solid border-gray-600">
                      <strong>{tx.closingPrice}</strong>
                      <p className="text-[0.7rem]">
                        {formatDate(tx.closingTime)}
                      </p>
                    </td>
                    <td className="px-3 py-1 border-2 border-solid border-gray-600">
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
                    <td className="px-3 py-1 border-2 border-solid border-gray-600">
                      <span
                        className={`text-sm ${
                          tx.pnlValue && tx.pnlValue > 0
                            ? "text-green-500"
                            : "text-red"
                        }`}
                      >
                        {tx.pnlValue} $
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center mt-4 space-x-2 mb-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 text-white py-2 bg-blue-500 hover:cursor-pointer rounded hover:bg-blue-600 transition-colors ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Prev
            </button>

            <span className="text-sm">
              {currentPage}/{totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 text-white py-2 bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Trade Info Modal */}
        <TradeInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trade={selectedTrade}
        />
      </div>
    </>
  );
};

export default TradesTable;
