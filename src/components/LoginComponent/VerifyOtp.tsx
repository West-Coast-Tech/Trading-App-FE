import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { verifyOtp } from '../../actions/authActions';  
import { AppState } from '../../actions/types';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { otpToken } = useSelector((state: AppState) => state.auth);

    const [otp, setOtp] = useState('');

 

  const handleVerifyOtp = async () => {
    
    const token = otpToken as string
    const payload = {
        otp,
        otpToken:token
    }
    // Send OTP to server
    try {
        await dispatch(verifyOtp(payload));
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex justify-center font-roboto">
    <div className="flex flex-col">
      <h1 className="text-2xl mb-8 text-white text-center">
        Verify OTP
      </h1>
      <div className="bg-[#161b22] p-8 rounded-lg border-[#30363d] shadow-md w-full sm:w-96">
        <form>
          <div className="mb-4">
            <label className="block text-[#f0f6fc] mb-2">
              Enter your OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-[#0d1117] p-3 border border-[#30363d] rounded"
              style={{
                color: "#ffffff", // Set text color to white
                caretColor: "#ffffff", // Set cursor color to white
              }}
              placeholder="Enter your OTP"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleVerifyOtp();
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleVerifyOtp}
            className="w-full p-3 bg-[#238636] text-white font-semibold rounded hover:bg-[#249990]"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default VerifyOtp;
