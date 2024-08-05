import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, verifyOtp } from "../../actions/authActions";
import { AppState } from "../../actions/types";
import VerifyOtp from "./VerifyOtp";
import {hashPassword} from "../../services/auth"
const Login = (_props: any) => {
  const navigate = useNavigate();
  const { isAuthenticated, otpToken, error, loading } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resendPayload, setResendPayload] = useState<{ email: string, password: string }>({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (otpToken) {
      return;
    }
    console.log("handling form submit");
    e.preventDefault();
    const hashedPassword = await hashPassword(password)
    // Create a payload object
    const payload = {
      email,
      password:hashedPassword,
    };

    try {
      await dispatch(loginUser(payload)); // Dispatch the login action
      setResendPayload({ email, password });

      // If successful, navigate to the home page
    } catch (error) {
      console.error('Login failed:', error);
      // Handle any additional error handling if needed
    }
  };

  return (
    <div className="min-h-screen  flex justify-center bg-gradient-to-br from-gray-900 to-blue-950 font-roboto">
      <div className="flex flex-col">
        <div className="flex justify-center pb-7 pt-10">
          <img className="h-20" src="src/assets/buildings.svg" alt="Logo"></img>
        </div>
        <h1 className="text-2xl mb-8 text-white text-center">
          Sign in to Trading App
        </h1>
        <div>
          {!otpToken ? (
            <div>
              <div className="bg-gray-100 rounded-lg shadow-2xl shadow-black p-8  sm:w-96">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-[#f0f6fc] mb-2">
                      Email address
                    </label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Enter you Email address"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[93%] bg-gray-100  p-3 border border-[#30363d] rounded"
                      style={{
                        color: "#ffffff", // Set text color to white
                        caretColor: "#ffffff", // Set cursor color to white
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex justify-between text-[#f0f6fc] mb-2">
                      Password
                      <a href="/forgot-password" className="text-blue-500 hover:text-blue-600">
                        Forgot password?
                      </a>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-[93%] p-3 bg-gray-100  border border-[#30363d] rounded"
                      style={{
                        color: "#ffffff", // Assuming white (#ffffff) for light-colored text
                        caretColor: "#ffffff", // White cursor color
                      }}
                    />
                  </div>
                  <p className="text-red text-xs text-center italic">{error}</p>
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
                    ) : 'Sign in'}
                  </button>
                </form>
              </div>
              <div className="mt-4 p-4 rounded-lg border-2 border-[#30363d] text-center bg-[#0d1117]">
                <p className="text-white">
                  New to Trading App?{" "}
                  <a
                    href="/register"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Create an account.
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <VerifyOtp
              verifyAction={verifyOtp}
              resendAction={loginUser}
              resendPayload={resendPayload}
              message="Check your email for the OTP"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
