// TradeInfoModal.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const TradeInfoModal: React.FC<any> = ({ isOpen, onClose, trade }) => {
  if (!isOpen || !trade) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="trade-info-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-secondary rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          aria-label="Close Modal"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 id="trade-info-title" className="text-2xl font-semibold mb-4">
          Trade Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong>Asset:</strong> {trade.symbol}
          </div>
          <div>
            <strong>Ticket No:</strong> {trade.ticketNo}
          </div>
          <div>
            <strong>Opening Price:</strong> {trade.openingPrice}
          </div>
          <div>
            <strong>Closing Price:</strong> {trade.closingPrice}
          </div>
          <div>
            <strong>Opening Time:</strong> {trade.openingTime}
          </div>
          <div>
            <strong>Closing Time:</strong> {trade.closingTime}
          </div>
          <div>
            <strong>IP Address:</strong> {trade.ipAddress || "-"}
          </div>
          <div>
            <strong>Amount Invested:</strong> {trade.amountInvested} $
          </div>
          <div>
            <strong>Profit/Loss:</strong>{" "}
            <span
              className={`font-semibold ${
                trade.pnlValue >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {trade.pnlValue.toFixed(2)} $
            </span>
          </div>
          {/* Add more detailed fields as necessary */}
        </div>
      </div>
    </div>
  );
};

export default TradeInfoModal;
