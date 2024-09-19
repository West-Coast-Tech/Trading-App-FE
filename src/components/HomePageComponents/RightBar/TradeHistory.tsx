import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, TradesData } from '../../../actions/types';
import { fetchTrades } from '../../../actions/tradeActions'; // Import update action
import { updateTradeSuccess } from '../../../features/trades/tradeSlice'; // Import the update action

const TradeHistory = () => {
    const [activeTab, setActiveTab] = useState('trades');
    const trades = useSelector((state: AppState) => state.trades.allTrades);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        // Fetch initial trades from the backend
        dispatch(fetchTrades())
        // Set up WebSocket connection
        const ws = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket URL

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Handle TRADE_COMPLETED messages
            if (data.type === 'TRADE_COMPLETED') {
                console.log('Trade completed:', data);

                // Dispatch the action to update the trade in Redux
                dispatch(fetchTrades())
            }
        };

        ws.onclose = () => {
            console.log('WebSocket to detect Trade closure disconnected');
        };

        return () => {
            ws.close(); // Cleanup WebSocket connection when component unmounts
        };
    }, []);

    return (
        <div className="flex flex-col h-[40vh] ">
            {/* Tabs */}
            <div className="flex">
                {/* Trades Tab */}
                <div
                    className={`text-center py-2 cursor-pointer ${
                        activeTab === 'trades'
                            ? 'flex-[2] border-t-2 border-solid border-blue-500 rounded-md'
                            : 'flex-1 backdrop-brightness-110 rounded-r-lg'
                    }`}
                    onClick={() => setActiveTab('trades')}
                >
                    {activeTab === 'trades' ? (
                        <span className="text-tBase">Trades</span>
                    ) : (
                        <FontAwesomeIcon className="text-gray-400" icon={faExchangeAlt} />
                    )}
                </div>

                {/* Orders Tab */}
                <div
                    className={`text-center py-2 cursor-pointer ${
                        activeTab === 'orders'
                            ? 'flex-[2] border-t-2 border-solid border-blue-500 rounded-md'
                            : 'flex-1 backdrop-brightness-110 rounded-l-lg'
                    }`}
                    onClick={() => setActiveTab('orders')}
                >
                    {activeTab === 'orders' ? (
                        <span className="text-tBase">Orders</span>
                    ) : (
                        <FontAwesomeIcon className="text-gray-400" icon={faClock} />
                    )}
                </div>
            </div>

            {/* Content with scrollable area */}
            <div className="-4 text-gray-500 text-xs overflow-y-auto no-scrollbar">
                {activeTab === 'trades' ? (
                    trades.length ? (
                        <ul className="list-none pl-2">
                            {trades.slice().reverse().map((trade) => (
                                <li key={trade.ticketNo} className={` ${trade.isComplete ? "font-thin":"font-extrabold text-gray-500"} `}>
                                    {trade.symbol} {trade.amountInvested}  {trade.openingPrice} {trade.closingPrice}  {trade.tradeDirection}  {trade.pnlValue}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No trades available</p>
                    )
                ) : (
                    <p>Orders are empty</p>
                )}
            </div>
        </div>
    );
};

export default TradeHistory;
