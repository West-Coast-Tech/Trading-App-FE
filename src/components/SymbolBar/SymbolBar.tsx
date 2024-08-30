import { useEffect, useState } from 'react';
import { fetchSymbols } from '../../actions/symbolActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, SymbolData } from '../../actions/types';

const selectSymbols = (state: AppState) => state.symbols.symbols;

const SymbolBar = () => {
  const symbols = useSelector(selectSymbols);
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('EURUSD'); // Default selected option
  const [category, setCategory] = useState<'forex' | 'crypto'>('forex'); // Default to showing Forex

  useEffect(() => {
    dispatch(fetchSymbols());
  }, [dispatch]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (name: string) => {
    setSelectedOption(name);
    setIsOpen(false); // Optionally close the table when an option is selected
  };

  const filteredSymbols = symbols.filter(symbol => symbol.type.toLowerCase() === category);

  return (
    <div className={`pl-5  overflow-hidden`}>
      <div className="flex items-center">
        <button
          className="text-white hover:bg-blue-500 p-4 py-2 rounded-lg font-bold text-xl bg-blue-600"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-controls="symbol-table"
        >
          {isOpen ? '×' : '+'}
        </button>
        <span className="ml-4">{selectedOption}</span>
      </div>
      <div
        className={`absolute z-50 w-1/3 bg-primary rounded-lg shadow-2xl shadow-black transition-all duration-500 ease-in-out transform ${
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
                    onClick={() => handleOptionClick(item.name)}
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
