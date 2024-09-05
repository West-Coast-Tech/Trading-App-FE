import { useEffect, useState } from 'react';
import { fetchSymbols } from '../../actions/symbolActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, SymbolData } from '../../actions/types';
import { selectSymbol } from '../../features/symbol/symbolSlice';

const selectSymbols = (state: AppState) => state.symbols.symbols;
const selectCurrentSymbol = (state: AppState) => state.symbols.selectedSymbol; // Selector for current symbol

const SymbolBar = () => {
  const symbols = useSelector(selectSymbols);
  const currentSymbol = useSelector(selectCurrentSymbol); // Get the selected symbol from the Redux state
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(currentSymbol?.name || ''); // Initialize with selected symbol name
  const [category, setCategory] = useState<'forex' | 'crypto' | 'stock'>('forex'); // Default to showing Forex

  useEffect(() => {
    dispatch(fetchSymbols());
  }, [dispatch]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (symbol: SymbolData) => {
    setSelectedOption(symbol.name);
    dispatch(selectSymbol(symbol)); // Dispatch the selected symbol action
    setIsOpen(false); // Optionally close the table when an option is selected
  };

  const filteredSymbols = symbols.filter(symbol => symbol.type.toLowerCase() === category);

  return (
    <div className={`overflow-hidden`}>
      <div className="flex items-center">
        <button
          className="text-white hover:cursor-pointer p-2 py-[0.02rem] rounded-lg font-bold text-lg bg-blue-600"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-controls="symbol-table"
        >
          {isOpen ? '×' : '+'}
        </button>
        <span className="ml-2 text-sm bg-black p-1.5 rounded-md text-white">{selectedOption || currentSymbol?.name}</span>
      </div>
      <div
        className={`absolute z-50 w-1/3 bg-background rounded-lg shadow-2xl shadow-black transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-2' : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
      >
        {isOpen && (
          <>
            <h2 className='text-xl p-2'>Select a Symbol</h2>
            {/* Category selection buttons */}
            <div className="p-2">
              <button
                onClick={() => setCategory('forex')}
                className={`cursor-pointer mr-2 px-4 py-1 ${
                  category === 'forex'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 hover:bg-gray-600 text-black'
                } rounded`}
              >
                Forex
              </button>
              <button
                onClick={() => setCategory('stock')}
                className={`cursor-pointer mr-2 px-4 py-1 ${
                  category === 'stock'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 hover:bg-gray-600 text-black'
                } rounded`}
              >
                Stock
              </button>
              <button
                onClick={() => setCategory('crypto')}
                className={`cursor-pointer px-4 py-1 ${
                  category === 'crypto'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 hover:bg-gray-600 text-black'
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
                {filteredSymbols.map((item: SymbolData) => (
                  <tr
                    key={item._id}
                    onClick={() => handleOptionClick(item)} // Pass the selected symbol
                    className={`cursor-pointer`}
                  >
                    <td className="py-1 px-2 text-xs">{item.name}</td>
                    <td className="py-1 px-2 text-xs">{item.type}</td>
                    <td className="py-1 px-2 text-xs">{item.description}</td>
                    <td className="py-1 px-2 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default SymbolBar;
