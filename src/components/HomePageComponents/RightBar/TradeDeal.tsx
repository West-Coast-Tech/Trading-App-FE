import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlus, faMinus, faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

const TradeDeal = () => {
    const [time, setTime] = useState('');
    const [investment, setInvestment] = useState(1);
    const [direction, setDirection] = useState('');
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    
    // setTime(formattedTime)
    useEffect(() => {
        const currentTime = new Date();
        const formattedTime = currentTime.toTimeString().slice(0, 5); // Get current time in HH:MM format
        setTime(formattedTime);
    }, []);
    const handleTimeClick = () => {
        setTimePickerVisible(!timePickerVisible);
    };

    const handleTimeSelect = (selectedTime: React.SetStateAction<string>) => {
        setTime(selectedTime);
        setTimePickerVisible(false);
    };
    const increaseTime = () => {
        const [hours, minutes] = time.split(':').map(Number);
        const newTime = new Date();
        newTime.setHours(hours);
        newTime.setMinutes(minutes + 1); // Increment by 1 minute
        setTime(newTime.toTimeString().slice(0, 5)); // Update state with HH:MM format
    };

    const decreaseTime = () => {
        const [hours, minutes] = time.split(':').map(Number);
        const newTime = new Date();
        newTime.setHours(hours);
        newTime.setMinutes(minutes - 1); // Decrement by 1 minute
        setTime(newTime.toTimeString().slice(0, 5)); // Update state with HH:MM format
    };

    const generateTimeIntervals = () => {
        const intervals = [];
        const currentTime = new Date();

        for (let i = 0; i < 16; i++) {
            const timeIncrement = new Date(currentTime.getTime() + i * 60000); // Increment by 1 minute
            const formattedTime = timeIncrement.toTimeString().slice(0, 5); // Format as HH:MM
            intervals.push(formattedTime);
        }
        return intervals;
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(`Time: ${time}, Investment: ${investment}, Direction: ${direction}`);
    };
    

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col items-center justify-center p-5 pt-4 gap-3 text-white"
        >
            <div className='flex flex-row text-xs gap-4'>
                <FontAwesomeIcon icon={faCircle} className="text-gray-400" />
                <b>USD/BRL (OTC) 93%</b>
            </div>
            <div className='flex flex-row text-xs gap-4 text-blue-600'>
                <b>Pending Trade</b>
                <FontAwesomeIcon icon={faCircle} className="text-blue-400" />
            </div>

            {/* Time Form */}
            <div className='relative w-full'>
                <div className="flex items-center justify-between">
                    <b>Time</b>
                    <b className='text-xs text-blue-600 hover:cursor-pointer'>Switch</b>
                </div>
                <div 
                    className="mt-2 flex items-center justify-between border-solid border-2 border-gray-600 rounded-md p-2 cursor-pointer" 
                    
                >    
                    <div className="flex items-center justify-between gap-2 w-full">
                        <FontAwesomeIcon 
                            icon={faMinus} 
                            className="text-gray-400 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents triggering handleTimeClick
                                decreaseTime();
                            }} 
                        />
                        <b onClick={handleTimeClick} >{time}</b>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="text-gray-400 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents triggering handleTimeClick
                                increaseTime();
                            }} 
                        />
                    </div>
                </div>     
            </div>


            {timePickerVisible && (
                <div className="absolute grid grid-cols-3 gap-2 bg-gray-700 p-1 rounded-md mt-[8rem] z-50">
                    {generateTimeIntervals().map((interval, index) => (
                        <div 
                            key={index} 
                            className="p-1 bg-gray-800 bg-opacity-100 text-white rounded cursor-pointer hover:bg-gray-600"
                            onClick={() => handleTimeSelect(interval)}
                        >
                            {interval}
                        </div>
                    ))}
                </div>
            )}

            {/* Investment Form */}
            <div className='relative w-full'>
            <div className="flex items-center justify-between">
                <b>Investment</b>
                <b className='text-xs text-blue-600 hover:cursor-pointer'>Switch</b>
            </div>
            <div className="mt-2 flex items-center justify-between border-solid border-2 border-gray-600 rounded-md p-2">       
                <FontAwesomeIcon 
                    icon={faMinus} 
                    className="text-gray-400 cursor-pointer" 
                    onClick={() => setInvestment(prev => Math.max(1, prev - 1))} 
                />
                <input 
                    type="text" 
                    value={investment} 
                    onChange={(e) => setInvestment(Number(e.target.value))} 
                    className="bg-transparent text-center text-white w-full"
                />
                <FontAwesomeIcon 
                    icon={faPlus} 
                    className="text-gray-400 cursor-pointer" 
                    onClick={() => setInvestment(prev => prev + 1)} 
                />
            </div>
            </div>

            <div className="flex flex-col items-start h-10 w-full">
                <button 
                    type="submit" 
                    className="bg-green-500 text-white font-extrabold flex items-center justify-between rounded-md px-4 h-full w-full hover:cursor-pointer"
                    onClick={() => setDirection('Up')}
                >
                    <p>Up</p>
                    <FontAwesomeIcon icon={faArrowCircleUp} className="text-white" />
                </button>
            </div>

            <div className="text-center text-sm ">
                <b>Your payout 1.90 $</b>
            </div>

            <div className="flex flex-col items-start h-10 w-full">
                <button 
                    type="submit" 
                    className="bg-red flex items-center text-white font-extrabold justify-between rounded-md px-4  h-full w-full hover:cursor-pointer"
                    onClick={() => setDirection('Down')}
                >
                    <p>Down</p>
                    <FontAwesomeIcon icon={faArrowCircleDown} />
                </button>
            </div>
        </form>
    );
};

export default TradeDeal;
