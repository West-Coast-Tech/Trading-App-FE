import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import { CryptoCard } from "./CryptoCard";
import { INowPaymentRecord } from "../../actions/types";
import QrCode from "react-qr-code";
const iconPath = "/cryptoIcons/";

export const ConfirmPayment = () => {
  const { paymentId } = useParams();
  const [coin, setCoin] = useState("");
  const [paymentRecord, setPaymentRecord] = useState<INowPaymentRecord>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!paymentId) {
      setErrorMessage("No payment ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchPaymentData = async () => {
      try {
        const token = sessionStorage.getItem("token") || "";
        const response = await API.getNowPaymentRecord(token, paymentId);
        const data = response.data;
        console.log("data", data);
        setCoin(data.pay_currency);
        setPaymentRecord(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setErrorMessage(
          "Failed to fetch payment data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [paymentId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-5 gap-6">
      <div className="col-span-1">
        <CryptoCard
          title={coin.toUpperCase()}
          icon={<img src={`${iconPath}${coin.toUpperCase()}.svg`} alt={coin} />}
        />
      </div>
      <div className="flex flex-col col-span-2 ">
        <h2 className="text-lg font-bold mb-4 text-white">
          Deposit ${paymentRecord?.price_amount} via{" "}
          {paymentRecord?.pay_currency.toUpperCase()}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className=" col-span-1 ">
            <div className=" w-44 bg-white justify-center items-center flex py-2">
              {paymentRecord?.pay_address && (
                <QrCode value={paymentRecord.pay_address} size={160} />
              )}
            </div>
          </div>
          <div className="text-gray-400 col-span-2 ">
            To complete the payment transfer{" "}
            <strong className="text-white">
              {paymentRecord?.pay_amount} {paymentRecord?.pay_currency}{" "}
            </strong>{" "}
            to address:
            <br />
            <br />
            <span className="text-white font-bold">
              {paymentRecord?.pay_address}
            </span>
          </div>
        </div>

        {/* Success Message */}
        {paymentRecord?.payment_status === "finished" && (
          <div className="mt-6 p-4  text-green-700 rounded-lg flex items-center">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">Payment Successful!</span>
          </div>
        )}
        {/* Waiting Message */}
        {paymentRecord?.payment_status === "waiting" && (
          <div
            className="mt-6 p-4  text-yellow-700 rounded-lg flex items-center"
            role="status"
            aria-live="polite"
            aria-label="Payment is pending"
          >
            {/* SVG Loading Spinner */}
            <svg
              className="animate-spin h-6 w-6 text-yellow-500 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="font-medium">Payment Pending!</span>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-400">
              Loading payment details...
            </span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-6 p-4  border border-red-400 text-xs italic text-red rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
