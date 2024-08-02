import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtpForPasswordReset, verifyPasswordResetOtp } from '../../actions/authActions';
import { AppState } from '../../actions/types';
import { useNavigate } from 'react-router-dom';
import VerifyOtp from './VerifyOtp';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { otpToken, resetToken, error, loading } = useSelector((state: AppState) => state.auth);
  useEffect(() => {
    if (resetToken) {
      navigate('/reset-password');
    }
  }, [resetToken, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(sendOtpForPasswordReset(email));
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-900 to-blue-950 font-roboto">
      <div className="flex flex-col">
        <div className="flex justify-center pb-7 pt-10">
          <img className="h-20" src="src/assets/buildings.svg" alt="Buildings" />
        </div>
        <h1 className="text-2xl mb-8 text-white text-center">
          Forgot Password
        </h1>
        <div>
          {!otpToken ? (
            <div>
              <p className="text-red text-xs text-center italic">{error}</p>
              <div className="bg-gray-100 p-8 rounded-lg border-[#30363d] shadow-xl shadow-black shadow-md  sm:w-96">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-[#f0f6fc] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[93%] bg-gray-100 p-3 border border-[#30363d] rounded"
                      style={{
                        color: "#ffffff",
                        caretColor: "#ffffff",
                      }}
                      required
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
                        Sending OTP...
                      </div>
                    ) : 'Change Password'}
                  </button>
                </form>
              </div>
              <div className="mt-4 p-4 rounded-lg border-2 border-[#30363d] text-center bg-[#0d1117]">
                <p className="text-[#f0f6fc]">
                  Remembered your password?{" "}
                  <a href="/login" className="text-blue-500 hover:text-blue-600">
                    Sign in
                  </a>
                  .
                </p>
              </div>
            </div>
          ) : (
            <div>
              <VerifyOtp
                verifyAction={verifyPasswordResetOtp}
                resendAction={sendOtpForPasswordReset}
                resendPayload={email}
                message="Check your email for the OTP"
              />
            </div>
          )}
        </div>
        <div className="flex justify-around pt-16">
          <a href="/" className="text-blue-500 hover:text-blue-600">
            Terms
          </a>{" "}
          <a href="/" className="text-blue-500 hover:text-blue-600">
            Privacy
          </a>{" "}
          <a href="/" className="text-blue-500 hover:text-blue-600">
            Security
          </a>{" "}
          <a
            href="/"
            className="text-gray-500 hover:text-blue-600 hover:underline"
          >
            Contact Us
          </a>{" "}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
