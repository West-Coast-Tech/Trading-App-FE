import React, { useState, useEffect } from 'react';

interface StringArrayDropdownProps {
  options: string[]; // Array of options to display in the dropdown
  onOptionSelect: (option: string) => void; // Callback function to execute upon selection
}

const StringArrayDropdown: React.FC<StringArrayDropdownProps> = ({ options, onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setSearchTerm(''); // Clear the search term after selection
    setIsOpen(false);
    onOptionSelect(option); // Call the callback function passed from the parent
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest('.relative')) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='relative pr-10'>
      <input
        type="text"
        placeholder="Search and select an option..."
        className="w-full sm:w-3/4 md:w-[91%] bg-gray-100 p-3 border border-[#30363d] rounded-lg text-white "
        value={selectedOption || searchTerm}
        onFocus={toggleDropdown} // Open dropdown on focus
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true); // Open dropdown when typing
        }}
      />
      {isOpen && (
        <div className="w-[89%] absolute z-10 mt-2 bg-[#5C616F] rounded-md shadow-lg">
          <ul className="w-full py-1 pl-0">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div key={index} className="block py-2 text-white text-sm hover:bg-gray-100 cursor-pointer">
                  <li onClick={() => handleOptionSelect(option)} className='pl-4 list-none'>
                    {option}
                  </li>
                </div>
              ))
            ) : (
              <li className="py-2 text-white text-sm pl-4 list-none">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StringArrayDropdown;