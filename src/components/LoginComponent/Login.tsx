import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { AppState } from "../../actions/types";
import VerifyOtp from "./VerifyOtp";
const Login = (_props: any) => {
  const navigate = useNavigate();
  
  const { isAuthenticated,otpToken,error } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  },[isAuthenticated,navigate])


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(otpToken){
      return 
    }
    console.log("handling form submit")
    e.preventDefault();

    // Create a payload object
    const payload = {
        email,  
        password,
        
    };

    try {
            await dispatch(loginUser(payload)); // Dispatch the login action
            // If successful, navigate to the home page
            
        } catch (error) {
            console.error('Login failed:', error);
            // Handle any additional error handling if needed
        }
  };

  return (
    
    <div className="min-h-screen bg-[#0d1117] flex justify-center font-roboto">
      <div className="flex flex-col">
        <div className="flex justify-center pb-7 pt-10">
          <img className="h-48" src="src\assets\buildings.svg"></img>
        </div>
        <h1 className="text-2xl mb-8 text-white text-center">
          Sign in to Trading App
        </h1>
        <div>

          {!otpToken ? ( <div>
            <p className="text-red text-xs text-center italic  ">{error}</p>

          <div className="bg-[#161b22] p-8 rounded-lg border-[#30363d] shadow-md w-full sm:w-96">
            
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#f0f6fc] mb-2">
                Username or email address
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] p-3 border border-[#30363d] rounded"
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                }}
              />
            </div>
            <div className="mb-4">
              <label className=" flex justify-between text-[#f0f6fc] mb-2">
                Password
                <a href="/" className="text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded"
                style={{
                  color: "#ffffff", // Assuming white (#ffffff) for light-colored text
                  caretColor: "#ffffff", // White cursor color
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#238636] text-white font-semibold rounded hover:bg-[#249990]"
            >
              Sign in
            </button>
          </form>
          </div>
          <div className="mt-4 p-4 rounded-lg border-2 border-[#30363d] text-center bg-[#0d1117]">
          <p className="text-[#f0f6fc]">
            New here?{" "}
            <a href="/register" className="text-blue-500 hover:text-blue-600">
              Create an account
            </a>
            .
          </p>
          </div>
          </div>):(
            <div>
              <p className="text-red text-xs text-center italic  ">{error}</p>
              <VerifyOtp></VerifyOtp>
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

export default Login;
