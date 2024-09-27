import { useEffect, useState } from "react";
import { fetchSymbols } from "../../actions/symbolActions";
import { useDispatch, useSelector } from "react-redux";
import { AppState, SymbolData } from "../../actions/types";
import { selectSymbol } from "../../features/symbol/symbolSlice";
import {
  addFavoriteSymbols,
  getUserData,
  removeFavoriteSymbol,
} from "../../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons"; // Filled star
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"; // Filled star

const selectSymbols = (state: AppState) => state.symbols.symbols;
const selectCurrentSymbol = (state: AppState) => state.symbols.selectedSymbol;
const selectFavoriteSymbols = (state: AppState) =>
  state.users.currentUser?.favoriteSymbols || [];

const SymbolBar = () => {
  const symbols = useSelector(selectSymbols);
  const currentSymbol = useSelector(selectCurrentSymbol);
  const favoriteSymbols = useSelector(selectFavoriteSymbols);
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    currentSymbol?.name || ""
  );
  const [category, setCategory] = useState<"forex" | "crypto" | "stock">(
    "forex"
  );
  console.log(
    "Favorite Symbols",
    useSelector((state: AppState) => state.users.currentUser?.favoriteSymbols)
  );
  useEffect(() => {
    dispatch(getUserData());
    dispatch(fetchSymbols());
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (symbol: SymbolData) => {
    setSelectedOption(symbol.name);
    dispatch(selectSymbol(symbol));
    setIsOpen(false);
  };

  const handleFavoriteToggle = (e: React.MouseEvent, symbolId: string) => {
    e.stopPropagation();
    if (favoriteSymbols.includes(symbolId)) {
      dispatch(removeFavoriteSymbol(symbolId));
    } else {
      dispatch(addFavoriteSymbols(symbolId));
    }
  };

  const filteredSymbols = symbols.filter(
    (symbol) => symbol.type.toLowerCase() === category
  );

  return (
    <div className={`absolute top-[6.6rem] z-10 pl-[0.385rem]`}>
      <div className="flex items-center">
        <button
          className="text-tBase hover:cursor-pointer p-2.5 py-[0.1rem] rounded-lg font-bold text-lg border-2 border-solid border-gray-500 brightness-125 bg-blue-600 backdrop-blur-sm"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-controls="symbol-table"
        >
          {isOpen ? "×" : "+"}
        </button>

        <div className="ml-2 flex space-x-2">
          {favoriteSymbols.map((symbolId) => {
            const isFavorited = favoriteSymbols.includes(symbolId);
            const symbol = symbols.find((s) => s._id === symbolId);
            if (!symbol) return null;
            const isSelected = currentSymbol?._id === symbolId;
            return (
              <div
                key={symbolId}
                onClick={() => handleOptionClick(symbol)}
                className={`flex flex-row backdrop-blur-sm items-center text-xs border-2 border-solid border-gray-700   p-[0.45rem] rounded-md cursor-pointer font-bold ${
                  isSelected
                    ? "border-2 border-solid border-gray-700 brightness-150 "
                    : ""
                }`}
              >
                <div>
                  <FontAwesomeIcon
                    icon={isFavorited ? solidStar : regularStar}
                    onClick={(e) => handleFavoriteToggle(e, symbolId)}
                    className="mr-2 text-yellow-500 cursor-pointer text-[0.7rem]"
                  />
                </div>
                <div className="text-gray-400 font-extrabold">
                  {symbol.name}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="pl-2"
                    onClick={(e) => handleFavoriteToggle(e, symbolId)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`absolute z-50 w-[60vh] bg-secondary rounded-lg shadow-2xl shadow-black transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-2"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {isOpen && (
          <>
            <h2 className="text-xl p-2">Select a Symbol</h2>
            {/* Category selection buttons */}
            <div className="p-2">
              <button
                onClick={() => setCategory("forex")}
                className={`cursor-pointer mr-2 px-4 py-1 ${
                  category === "forex"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-600 text-black"
                } rounded`}
              >
                Forex
              </button>
              <button
                onClick={() => setCategory("stock")}
                className={`cursor-pointer mr-2 px-4 py-1 ${
                  category === "stock"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-600 text-black"
                } rounded`}
              >
                Stock
              </button>
              <button
                onClick={() => setCategory("crypto")}
                className={`cursor-pointer px-4 py-1 ${
                  category === "crypto"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-600 text-black"
                } rounded`}
              >
                Crypto
              </button>
            </div>
            {/* Symbols table */}
            <table id="symbol-table" className="table-fixed w-full mt-2">
              <thead>
                <tr>
                  <th className="py-1 px-2 text-left text-xs">Name</th>
                  <th className="py-1 px-2 text-left text-xs">Type</th>
                  <th className="py-1 px-2 text-left text-xs">Description</th>
                  <th className="py-1 px-2 text-left text-xs">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredSymbols.map((item: SymbolData) => {
                  const isFavorited = favoriteSymbols.includes(item._id);
                  return (
                    <tr
                      key={item._id}
                      className="cursor-pointer"
                      onClick={() => handleOptionClick(item)}
                    >
                      <td className="py-1 px-2 text-xs flex items-center">
                        <FontAwesomeIcon
                          icon={isFavorited ? solidStar : regularStar}
                          onClick={(e) => handleFavoriteToggle(e, item._id)}
                          className="mr-2 text-yellow-500 cursor-pointer text-xl"
                        />
                        {item.name}
                      </td>
                      <td className="py-1 px-2 text-xs">{item.type}</td>
                      <td className="py-1 px-2 text-xs">{item.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default SymbolBar;
