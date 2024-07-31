import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../actions/types';

interface VerifyOtpProps {
  verifyAction: (payload: { otp: string, otpToken: string }) => any;
  resendAction: (payload: any) => any;
  message: string;
  resendPayload: any;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ verifyAction, resendAction, message, resendPayload }) => {
  const dispatch = useDispatch<any>();
  const { otpToken, loading, error } = useSelector((state: AppState) => state.auth);

  const [otp, setOtp] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      timer = setInterval(() => {
        console.log("timeleft ",timeLeft)
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = otpToken as string;
    const payload = {
      otp,
      otpToken: token,
    };
    // Send OTP to server
    try {
      await dispatch(verifyAction(payload));
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  const handleResendOtp = async () => {
    // Resend OTP to server
    try {
      await dispatch(resendAction(resendPayload));
      setIsCooldown(true);
      setTimeLeft(60);
    } catch (error) {
      console.error('Error resending OTP', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center font-roboto">
      <div className="flex flex-col">
        <h1 className="text-xl mb-8 text-white text-center">{message}</h1>
        <div className="bg-gray-100 p-8 rounded-lg border-[#30363d] shadow-xl shadow-black shadow-md w-full sm:w-96">
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="block text-[#f0f6fc] mb-2">Enter your OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-[93%] bg-gray-100 p-3 border border-[#30363d] rounded"
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                }}
                placeholder="Enter your OTP"
              />
              <p className="text-red text-xs text-center italic">{error}</p>
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
                  Verifying...
                </div>
              ) : 'Verify OTP'}
            </button>
          </form>
          <button
            type="button"
            className={`w-full mt-4 p-3 ${isCooldown ? 'bg-gray-400' : 'bg-[#1c7c36]'} text-white font-semibold rounded ${isCooldown ? 'cursor-not-allowed' : 'hover:bg-[#249990]'}`}
            onClick={handleResendOtp}
            disabled={isCooldown || loading}
          >
            {isCooldown ? `Resend in ${timeLeft}s` : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
