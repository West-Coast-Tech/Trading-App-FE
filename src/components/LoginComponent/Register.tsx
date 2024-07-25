import React, { useState, useRef, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle, faExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { registerUser } from "../../actions/authActions";
import { AppState } from "../../actions/types";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const Register = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<any>();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");
  const [serviceAgreement, setServiceAgreement] = useState(false);
  const [declarationAgreement, setDeclarationAgreement] = useState(false);
  


  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  },[isAuthenticated,navigate])


  useEffect(() => {
    if(userRef.current){
      userRef.current.focus();
  }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);
  
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password,matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [email, password, matchPassword, fullName, currency, country, serviceAgreement, declarationAgreement]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Create a payload object
    const payload = {
        email,
        password,
        fullName,
        currency,
        country,
    };
    try {
      await dispatch(registerUser(payload)); // Dispatch the login action
      // If successful, navigate to the home page
      
  } catch (error) {
      console.error('Login failed:', error);
      // Handle any additional error handling if needed
  }

  };

  //Custom Css Classes for styling
  const inputClassCSS =
    "w-full  bg-gray-100 p-3 border border-[#30363d] rounded-lg ";

  const labelCssClass="block mb-2 text-white font-bold";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex justify-center font-roboto">
      <div className="flex flex-col">
        <div className="flex justify-center pb-2 pt-10">
          <img className="h-12" src="src\assets\buildings.svg"></img>
        </div>
        <h1 className="text-2xl mb-8 font-sheriff text-white text-center">
          Sign Up to Trading App
        </h1>

        <div className="bg-gray-100 p-12 pr-20 rounded-lg shadow-2xl shadow-black w-full sm:w-96">
          <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className={labelCssClass}>Full Name</label>
              <input
                type="text"
                ref={userRef}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                  fontSize: "18px",
                }}
              />
            </div>
            <div className="mb-4">
              <label className={labelCssClass}>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                }}
              />
            </div>
            <div className="mb-4">
              <label className={labelCssClass}>Email address</label>
              <input
                type="text"
                value={email}
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                }}
              />
              <p id="emailnote" className={`${emailFocus && email && !validEmail ? "text-red flex items-center" : "hidden"}`}>
                <FontAwesomeIcon className="pr-2" icon={faInfoCircle} />Please enter a valid email</p>
            </div> 
            <div className="mb-4">
              <label className={labelCssClass}>Currency</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                }}
              />
            </div>
            <div className="mb-4">
              <label className={labelCssClass}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Assuming white (#ffffff) for light-colored text
                  caretColor: "#ffffff", // White cursor color
                }}
              />
            </div>
            <div className="mb-4">
              <label className={labelCssClass}>
                Confirm Password              
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value !== password) {
                    setPasswordError("Passwords do not match");
                  } else {
                    setPasswordError("");
                  }
                }}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Assuming white (#ffffff) for light-colored text
                  caretColor: "#ffffff", // White cursor color
                }}
              />
              {passwordError && (
                <p className="text-red mt-2 text-sm">{passwordError}</p>
              )}
            </div>
            
            <div className="mb-4">
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white font-semibold rounded hover:bg-green-900"
            >
              Sign in
            </button>
            </div>
          </form>
          
        </div>
        <div className="mt-4 p-4 rounded-lg border-2 border-[#30363d] text-center bg-[#0d1117]">
          <p className="text-[#f0f6fc]">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </a>
            .
          </p>
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

export default Register;
