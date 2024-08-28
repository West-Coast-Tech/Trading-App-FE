import  { useEffect, useState } from 'react';
import { fetchSymbols } from '../../actions/symbolActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, SymbolData } from '../../actions/types';
const selectSymbols = (state: AppState) => state.symbols.symbols

const SymbolBar = () => {

  
  const symbols = useSelector(selectSymbols);
  console.log("symbols",symbols)
    const dispatch = useDispatch<any>()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('EURUSD'); // Default selected option
    const [category, setCategory] = useState<'forex' | 'crypto'>('forex'); // Default to showing Forex
    useEffect(() => {
        dispatch(fetchSymbols());
    }, [dispatch]);
    


  // const placeholderData = [
  //   { id: 1, name: 'USD/MXN (OTC)', change: -0.08, profit1: 93, profit5: 93 },
  //   { id: 2, name: 'EUR/USD (OTC)', change: 0.12, profit1: 87, profit5: 89 },
  //   { id: 3, name: 'GBP/USD (OTC)', change: -0.03, profit1: 91, profit5: 92 },
  //   // Add more unique items if necessary
  // ];

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (name: string) => {
    setSelectedOption(name);
    setIsOpen(false); // Optionally close the table when an option is selected
  };
  const filteredSymbols = symbols.filter(symbol => symbol.type.toLowerCase() === category);


  return (
    <div className={`bg-gray-100 shadow-sm w-1/2 ${isOpen ? 'h-auto' : 'h-12'} overflow-hidden`}>
      <div className="flex items-center">
        <button
          className="text-white hover:bg-blue-500 p-4 py-2 rounded-lg font-bold text-xl bg-blue-600"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-controls="symbol-table"
        >
          {isOpen ? '×' : '+'}
        </button>
        <span className="ml-4 text-white">{selectedOption}</span>
      </div>
      {isOpen && (
        <>
          <div className='bg-gray-950 rounded-lg text-white'>
            <h2 className='text-xl p-2'>Select a Symbol</h2>
            {/* Category selection buttons */}
            <div className="p-2">
              <button onClick={() => setCategory('forex')} className={`cursor-pointer mr-2 px-4 py-1 ${category === 'forex' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-600 text-black'} rounded`}>Forex</button>
              <button onClick={() => setCategory('crypto')} className={`cursor-pointer px-4 py-1 ${category === 'crypto' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-600 text-black'} rounded`}>Crypto</button>
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
                    className={`cursor-pointer ${selectedOption === item.name ? 'bg-blue-900' : ''}`}
                  >
                    <td className="py-1 px-2 text-xs">{item.name}</td>
                    <td className="py-1 px-2 text-xs">{item.type}</td>
                    <td className="py-1 px-2 text-xs">{item.description}</td>
                    <td className="py-1 px-2 text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SymbolBar;
