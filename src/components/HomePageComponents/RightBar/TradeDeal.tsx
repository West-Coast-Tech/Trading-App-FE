import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faPlus,
  faMinus,
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../../../actions/types";
import { useSelector, useDispatch } from "react-redux";
import { addTrade } from "../../../actions/tradeActions";

const selectCurrentSymbol = (state: AppState) => state.symbols.selectedSymbol;

const TradeDeal = () => {
  const [time, setTime] = useState<Date>(() => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutesToAdd = seconds > 0 ? 2 : 1;
    now.setSeconds(0, 0);
    now.setMinutes(now.getMinutes() + minutesToAdd);
    return now;
  });
  const [investment, setInvestment] = useState(100);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [isIntervalMode, setIsIntervalMode] = useState(false);
  const [interval, setInterval] = useState<number>(60000); // Default 1 minute in milliseconds
  const dispatch = useDispatch<any>();
  const currentSymbol = useSelector(selectCurrentSymbol);

  const handleTimeClick = () => {
    setTimePickerVisible(!timePickerVisible);
  };

  const handleSwitch = () => {
    setIsIntervalMode(!isIntervalMode);
    setTimePickerVisible(false);
  };

  const handleTimeSelect = (selectedTime: Date) => {
    setTime(selectedTime);
    setTimePickerVisible(false);
  };

  const handleIntervalSelect = (selectedInterval: number) => {
    setInterval(selectedInterval);
    setTimePickerVisible(false);
  };

  const increaseTime = () => {
    if (isIntervalMode) {
      setInterval((prev) => prev + 60000);
    } else {
      setTime((prevTime) => new Date(prevTime.getTime() + 60000));
    }
  };

  const decreaseTime = () => {
    if (isIntervalMode) {
      setInterval((prev) => Math.max(5000, prev - 60000));
    } else {
      setTime((prevTime) => new Date(prevTime.getTime() - 60000));
    }
  };

  const generateTimeIntervals = () => {
    const intervals: Date[] = [];
    const now = new Date();
    const seconds = now.getSeconds();
    const minutesToAdd = seconds > 0 ? 2 : 1;
    now.setSeconds(0, 0);
    now.setMinutes(now.getMinutes() + minutesToAdd);

    const intervalMinutes = [1, 2, 3, 4, 5, 10, 15, 25, 40, 60, 90, 150]; // in minutes

    intervalMinutes.forEach((min) => {
      const intervalTime = new Date(now.getTime() + min * 60000);
      intervals.push(intervalTime);
    });

    return intervals;
  };

  const generateIntervalOptions = () => {
    const intervals = [
      5000, // 5 seconds
      10000, // 10 seconds
      15000, // 15 seconds
      30000, // 30 seconds
      60000, // 1 minute
      2 * 60000, // 2 minutes
      5 * 60000, // 5 minutes
      10 * 60000, // 10 minutes
      15 * 60000, // 15 minutes
      30 * 60000, // 30 minutes
      60 * 60000, // 1 hour
      2 * 60 * 60000, // 2 hours
    ];

    return intervals;
  };

  const formatInterval = (milliseconds: number) => {
    let totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  };

  const generateRandomTicketNumber = (): string => {
    const min = Math.pow(10, 7);
    const max = Math.pow(10, 8) - 1;
    return String(Math.floor(Math.random() * (max - min + 1) + min));
  };

  const handleSubmit = (direction: string) => {
    const ticketNo = generateRandomTicketNumber();
    const openingTime = new Date();
    let closingTime: Date;

    if (isIntervalMode) {
      closingTime = new Date(openingTime.getTime() + interval);
    } else {
      closingTime = time;
    }

    const symbol = currentSymbol?.name;
    if (!symbol) {
      console.log("Symbol is not found");
      return;
    }
    const payload = {
      ticketNo,
      symbol,
      currency: "USD",
      tradeDirection: direction,
      amountInvested: investment,
      openingTime: openingTime.toISOString(),
      closingTime: closingTime.toISOString(),
      isComplete: false,
      openingPrice: null,
      closingPrice: null,
      pnlValue: null,
      accountType: "demo",
    };
    try {
      dispatch(addTrade(payload));
    } catch (error) {
      console.error("Sending Trade Failed", error);
    }
    console.log(
      `Time: ${closingTime.toString()}, Investment: ${investment}, Direction: ${direction}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 pt-4 gap-3 text-tBase">
      <div className="flex flex-row text-xs gap-4">
        <FontAwesomeIcon icon={faCircle} className="text-gray-400" />
        <b>USD/BRL (OTC) 93%</b>
      </div>
      <div className="flex flex-row text-xs gap-4 text-blue-600">
        <b>Pending Trade</b>
        <FontAwesomeIcon icon={faCircle} className="text-blue-400" />
      </div>

      {/* Time Form */}
      <div className="relative w-full">
        <div className="flex items-center justify-between">
          <b>{isIntervalMode ? "Interval" : "Time"}</b>
          <b
            className="text-xs text-blue-600 hover:cursor-pointer"
            onClick={handleSwitch}
          >
            Switch
          </b>
        </div>
        <div
          className="mt-2 flex items-center justify-between border-2 border-gray-600 border-solid rounded-md p-2 cursor-pointer"
          onClick={handleTimeClick}
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <FontAwesomeIcon
              icon={faMinus}
              className="text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                decreaseTime();
              }}
            />
            <b>
              {isIntervalMode
                ? formatInterval(interval)
                : time.toLocaleTimeString([], {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </b>
            <FontAwesomeIcon
              icon={faPlus}
              className="text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                increaseTime();
              }}
            />
          </div>
        </div>
      </div>

      {timePickerVisible && (
        <div className="absolute grid grid-cols-3 gap-2 bg-gray-700 p-1 rounded-md mt-[3rem] z-50">
          {isIntervalMode
            ? generateIntervalOptions().map((option, index) => (
                <div
                  key={index}
                  className="p-1 bg-gray-800 text-white rounded cursor-pointer hover:bg-gray-600"
                  onClick={() => handleIntervalSelect(option)}
                >
                  {formatInterval(option)}
                </div>
              ))
            : generateTimeIntervals().map((intervalTime, index) => (
                <div
                  key={index}
                  className="p-1 bg-gray-800 text-white rounded cursor-pointer hover:bg-gray-600"
                  onClick={() => handleTimeSelect(intervalTime)}
                >
                  {intervalTime.toLocaleTimeString([], {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              ))}
        </div>
      )}

      {/* Investment Form */}
      <div className="relative w-full">
        <div className="flex items-center justify-between">
          <b>Investment</b>
          <b className="text-xs text-blue-600 hover:cursor-pointer">Switch</b>
        </div>
        <div className="mt-2 flex items-center justify-between border-2 border-solid border-gray-600 rounded-md p-2">
          <FontAwesomeIcon
            icon={faMinus}
            className="text-gray-400 cursor-pointer"
            onClick={() => setInvestment((prev) => Math.max(1, prev - 1))}
          />
          <input
            type="number"
            min="1"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="bg-transparent text-center w-full text-tBase"
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="text-gray-400 cursor-pointer"
            onClick={() => setInvestment((prev) => prev + 1)}
          />
        </div>
      </div>

      {/* Up Button */}
      <div className="flex flex-col items-start h-10 w-full">
        <button
          type="button"
          className="
      bg-green-500 
      text-white 
      font-extrabold 
      flex 
      items-center 
      justify-between 
      rounded-md 
      px-4 
      h-full 
      w-full 
      hover:bg-green-600 
      hover:shadow-lg 
      hover:cursor-pointer
      active:bg-green-400 
      active:brightness-110 
      active:outline-none 
      active:ring-2 
      active:ring-green-300 
      transition 
      transform 
      duration-200 
      ease-in-out 
      active:scale-95
    "
          onClick={() => handleSubmit("up")}
          aria-label="Submit Up Trade"
        >
          <p>Up</p>
          <FontAwesomeIcon icon={faArrowCircleUp} className="text-white" />
        </button>
      </div>

      <div className="text-center text-sm">
        <b>Your payout 1.90 $</b>
      </div>

      {/* Down Button */}
      <div className="flex flex-col items-start h-10 w-full">
        <button
          type="button"
          className="bg-red
          text-white 
          font-extrabold 
          flex 
          items-center 
          justify-between 
          rounded-md 
          px-4 
          h-full 
          w-full 
          hover:brightness-90
          hover:shadow-lg 
          hover:cursor-pointer
          active:brightness-110
          active:outline-none 
          active:ring-2 
          active:ring-green-300 
          transition 
          transform 
          duration-200 
          ease-in-out 
          active:scale-95"
          onClick={() => handleSubmit("down")}
        >
          <p>Down</p>
          <FontAwesomeIcon icon={faArrowCircleDown} />
        </button>
      </div>
    </div>
  );
};

export default TradeDeal;
