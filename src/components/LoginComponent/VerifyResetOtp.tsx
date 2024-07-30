import React, { useState } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { verifyOtp, verifyPasswordResetOtp } from '../../actions/authActions';  
import { AppState } from '../../actions/types';

const VerifyResetOtp = () => {
    const dispatch = useDispatch<any>();
    const { otpToken,loading } = useSelector((state: AppState) => state.auth);

    const [otp, setOtp] = useState('');

 

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = otpToken as string
    const payload = {
        otp,
        otpToken:token
    }
    // Send OTP to server
    try {
        await dispatch(verifyPasswordResetOtp(payload));
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex justify-center font-roboto">
    <div className="flex flex-col">
      <h1 className="text-xl mb-8 text-white text-center">
        Verify OTP to reset your password
      </h1>
      <div className="bg-[#161b22] p-8 rounded-lg border-[#30363d] shadow-md w-full sm:w-96">
        <form onSubmit={handleVerifyOtp}>
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
              
            />
          </div>
          <button
                    type="submit"
                    className={`w-full p-3 ${loading ? 'bg-[#1c7c36]' : 'bg-[#238636]'} text-white font-semibold rounded ${loading ? 'cursor-not-allowed' : 'hover:bg-[#249990]'}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.961 7.961 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging In...
                      </div>
                    ) : 'Verify OTP'}
                  </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default VerifyResetOtp;
