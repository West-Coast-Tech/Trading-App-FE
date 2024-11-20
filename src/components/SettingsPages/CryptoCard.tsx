import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CryptoCardProps {
  title: string;
  icon: ReactNode | [ReactNode, ReactNode];
  url?: string;
  maxAmount?: number;
  minAmount?: number;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  title,
  icon,
  url,
  maxAmount,
  minAmount,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // Navigate to the dynamic URL based on current path and url parameter
    if (url) {
      navigate(`${location.pathname}/${url}`);
    }
  };

  return (
    <div className="bg-white  rounded-md">
      <div
        onClick={handleClick}
        className={`rounded-md bg-tBase text-primary w-full h-24 flex flex-row items-center justify-start space-x-5 ${
          url &&
          "cursor-pointer  hover:bg-background hover:text-tBase transition duration-600"
        }`}
      >
        {/* Render single icon or two icons side by side */}
        <div className="flex items-center justify-center space-x-1 mb-2 pl-5 ">
          {Array.isArray(icon) ? (
            icon.map((IconComponent, index) => (
              <div key={index} className="flex items-center">
                {IconComponent}
              </div>
            ))
          ) : (
            <div>{icon}</div>
          )}
        </div>
        <span className="text-sm ">{title}</span>
      </div>
      {maxAmount && (
        <div className=" mx-5 text-start pl-10 pb-4 border-t border-gray-400  border-solid">
          <p>
            <span className="text-gray-500">Max Amount :</span>{" "}
            <span className="font-extrabold">{maxAmount}</span>
          </p>
          <p>
            <span className="text-gray-500">Min Amount :</span>{" "}
            <span className="font-extrabold ">{minAmount}</span>
          </p>
        </div>
      )}
    </div>
  );
};
