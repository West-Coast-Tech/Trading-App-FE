import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowDown,
  faCircleArrowUp,
  faClock,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppState, TradesData } from "../../../actions/types";
import { fetchTrades } from "../../../actions/tradeActions"; // Import update action
import { updateTradeSuccess } from "../../../features/trades/tradeSlice"; // Import the update action
const SERVER_IP = import.meta.env.VITE_SERVER_IP || "localhost";

// Helper function to format milliseconds to mm:ss
const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.max(Math.ceil(milliseconds / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
};
const selectAccount = (state: AppState) => state?.accounts?.selectedAccount;
const TradeHistory: React.FC = () => {
  const selectedAccount = useSelector(selectAccount);

  const [activeTab, setActiveTab] = useState("trades");
  const [expandedTradeId, setExpandedTradeId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const trades = useSelector((state: AppState) => state.trades.allTrades);
  const dispatch = useDispatch<any>();
  //Filter Trades based on selectedAccount.accNo
  const filteredTrades = trades.filter(
    (trade) => trade.accountNo === selectedAccount?.accNo
  );

  useEffect(() => {
    // Fetch initial trades from the backend
    dispatch(fetchTrades());

    // Set up WebSocket connection
    const ws = new WebSocket(`ws://${SERVER_IP}:8081`); // Replace with your WebSocket URL

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle TRADE_COMPLETED messages
      if (data.type === "TRADE_COMPLETED") {
        console.log("Trade completed:", data);

        // Dispatch the action to update the trade in Redux
        dispatch(fetchTrades());
      }
    };

    ws.onclose = () => {
      console.log("WebSocket to detect Trade closure disconnected");
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, [dispatch]);

  useEffect(() => {
    // Update currentTime every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const toggleTradeDescription = (ticketNo: number) => {
    if (expandedTradeId === ticketNo) {
      // If clicking the same trade, collapse it
      setExpandedTradeId(null);
    } else {
      // Expand the new trade
      setExpandedTradeId(ticketNo);
    }
  };
  console.log("Trades In TradeSHIstor", trades);
  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex">
        {/* Trades Tab */}
        <div
          className={`text-center py-2 cursor-pointer ${
            activeTab === "trades"
              ? "flex-[2] border-t-2 border-solid border-blue-500 rounded-md"
              : "flex-1 backdrop-brightness-110 rounded-r-lg"
          }`}
          onClick={() => setActiveTab("trades")}
        >
          {activeTab === "trades" ? (
            <span className="text-tBase">Trades</span>
          ) : (
            <FontAwesomeIcon className="text-gray-400" icon={faExchangeAlt} />
          )}
        </div>

        {/* Orders Tab */}
        <div
          className={`text-center py-2 cursor-pointer ${
            activeTab === "orders"
              ? "flex-[2] border-t-2 border-solid border-blue-500 rounded-md"
              : "flex-1 backdrop-brightness-110 rounded-l-lg"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          {activeTab === "orders" ? (
            <span className="text-tBase">Orders</span>
          ) : (
            <FontAwesomeIcon className="text-gray-400" icon={faClock} />
          )}
        </div>
      </div>

      {/* Content with scrollable area */}
      <div className="text-xs overflow-y-auto no-scrollbar">
        {activeTab === "trades" ? (
          trades.length ? (
            <div className="">
              <div className="flex text-gray-500 text-xs gap-3 font-semibold p-2 justify-center items-center">
                <span>{currentTime.toDateString()}</span>
                <span className="px-[0.23rem] rounded-xl text-[0.66rem] bg-gray-500 text-primary">
                  {trades.length}
                </span>
              </div>
              <ul className="list-none pl-0">
                {filteredTrades
                  .slice()
                  .reverse()
                  .map((trade) => {
                    const closingTime = new Date(trade.closingTime).getTime();
                    const openingTime = new Date(trade.openingTime).getTime();
                    const currentTimestamp = currentTime.getTime();

                    const isActive = currentTimestamp < closingTime;

                    const timeDifference = isActive
                      ? closingTime - currentTimestamp
                      : closingTime - openingTime;

                    // Ensure non-negative time difference
                    const safeTimeDifference = Math.max(timeDifference, 0);

                    // Parse ticketNo once and store as number
                    const ticketNoNumber =
                      typeof trade.ticketNo === "string"
                        ? parseInt(trade.ticketNo)
                        : trade.ticketNo;

                    const isExpanded = expandedTradeId === ticketNoNumber;

                    return (
                      <React.Fragment key={trade.ticketNo}>
                        <li
                          className="flex justify-between text-tBase items-center p-2 border-b-[1px] border-solid border-borderColor hover:cursor-pointer"
                          onClick={() => toggleTradeDescription(ticketNoNumber)}
                        >
                          <div className="flex items-center">
                            {/* Static down arrow */}
                            <svg
                              className="h-4 w-4 text-gray-400 mr-2 cursor-pointer"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                            <div>
                              <span className="font-bold">{trade.symbol}</span>
                              <div className="flex items-center text-[0.65rem]">
                                {/* Conditional arrow for trade direction */}
                                {trade.tradeDirection === "down" ? (
                                  <FontAwesomeIcon
                                    color="red"
                                    icon={faCircleArrowDown}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    className="text-green-600"
                                    icon={faCircleArrowUp}
                                  />
                                )}
                                <span
                                  className={`text-xs pl-2 ${
                                    trade.tradeDirection === "up"
                                      ? "text-green-500"
                                      : "text-red"
                                  }`}
                                >
                                  {trade.amountInvested} $
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xxs block">
                              {formatTime(safeTimeDifference)}
                            </span>
                            <span
                              className={`text-xs font-semibold ${
                                trade.pnlValue && trade.pnlValue >= 0
                                  ? "text-green-500"
                                  : "text-red"
                              }`}
                            >
                              {trade.pnlValue !== null
                                ? `${trade.pnlValue || 0} $`
                                : "0 $"}
                            </span>
                          </div>
                        </li>
                        {/* Description Box */}
                        <div
                          className={`overflow-hidden pl-7 rounded-md transition-all duration-500 ease-in-out ${
                            isExpanded
                              ? "opacity-100 max-h-96 mt-2"
                              : "opacity-0 max-h-0"
                          }`}
                        >
                          <p>
                            <strong>ID:</strong> {trade.ticketNo}
                          </p>
                          <p>
                            <strong>Opening Price:</strong> {trade.openingPrice}
                          </p>
                          <p>
                            <strong>Closing Price:</strong> {trade.closingPrice}
                          </p>
                          <p>
                            <strong>Opening Time:</strong>{" "}
                            {new Date(trade.openingTime).toLocaleString()}
                          </p>
                          <p>
                            <strong>Closing Time:</strong>{" "}
                            {new Date(trade.closingTime).toLocaleString()}
                          </p>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <p className="p-4">No trades available</p>
          )
        ) : (
          <p className="p-4">Orders are empty</p>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;
