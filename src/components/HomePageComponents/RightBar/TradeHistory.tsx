import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const TradeHistory = () => {
  const [activeTab, setActiveTab] = useState('trades');

  return (
    <div className="bg-secondary flex flex-col h-full rounded-lg">
      {/* Tabs */}
      <div className="flex">
        {/* Trades Tab */}
        <div
          className={`text-center py-2 cursor-pointer ${
            activeTab === 'trades'
              ? 'flex-[2] border-t-2 border-solid border-blue-500  rounded-md'
              : 'flex-1 backdrop-brightness-110 rounded-r-lg'
          }`}
          onClick={() => setActiveTab('trades')}
        >
          {activeTab === 'trades' ? (
            <span className="text-white">Trades</span>
          ) : (
            <FontAwesomeIcon className="text-gray-400" icon={faExchangeAlt} />
          )}
        </div>

        {/* Orders Tab */}
        <div
          className={`text-center py-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'flex-[2] border-t-2 border-solid border-blue-500  rounded-md'
              : 'flex-1 backdrop-brightness-110 rounded-l-lg'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          {activeTab === 'orders' ? (
            <span className="text-white">Orders</span>
          ) : (
            <FontAwesomeIcon className="text-gray-400" icon={faClock} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 text-center text-gray-500">
        {activeTab === 'trades' ? (
          <p>Trades are empty</p>
        ) : (
          <p>Orders are empty</p>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;
