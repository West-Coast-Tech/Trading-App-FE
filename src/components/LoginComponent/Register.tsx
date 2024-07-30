import React, { useState, useRef, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle, faExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { registerUser } from "../../actions/authActions";
import { AppState } from "../../actions/types";
import StringArrayDropdown from "../StringArrayDropdown";
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
  const [country, setCountry] = useState<string>("");
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
      console.log("payload",payload)

      await dispatch(registerUser(payload)); // Dispatch the login action
      // If successful, navigate to the home page
      
  } catch (error) {
      console.error('Login failed:', error);
      // Handle any additional error handling if needed
  }

  };


  const handleCountrySelect = (country: string) => {
    setCountry(country);
  };
  const handleCurrencySelect = (currency: string) => {
    setCurrency(currency);
  };

  
  const countries:string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Democratic Republic of the)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ]
  const currencies:string[] = [
    "USD","EUR","GBP"
  ]
  //Custom Css Classes for styling
  const inputClassCSS =
    "w-full sm:w-3/4 md:w-5/6 bg-gray-100 p-3 border border-[#30363d] rounded-lg ";
  const labelCssClass="block mb-2 text-white font-bold";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 font-roboto">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center pt-10">
        <img className="h-20 mx-auto" src="src\assets\buildings.svg"></img>
        </div>
        <h1 className="text-2xl mb-8 text-center font-sheriff text-white">Sign Up to Trading App</h1>

        <div className="bg-gray-100 p-8 pr-2  rounded-lg shadow-2xl shadow-black w-[93%]">
          <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleSubmit} className=" space-y-4">
          <div className="">
              <label className={labelCssClass}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                ref={userRef}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClassCSS}
                style={{
                  color: "#ffffff", // Set text color to white
                  caretColor: "#ffffff", // Set cursor color to white
                  fontSize: "15px",
                }}
              />
            </div>
            
        <label className={labelCssClass} htmlFor="country">Country</label>
        <StringArrayDropdown options={countries} onOptionSelect={handleCountrySelect} />
      
            <div className="">
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
              <label className={labelCssClass}>Currency</label>
              <StringArrayDropdown options={currencies} onOptionSelect={handleCurrencySelect} />
            <div className="">
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
            <div className="">
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
            
            <div className="">
            <button
              type="submit"
              className="w-[89%] py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-900 transition duration-300 ease-in-out"
            >
              Sign in
            </button>
            </div>
          </form>
          
        </div>
        <div className="mt-4 w-[93%] p-4 pr-6 rounded-lg border-2 border-[#30363d] text-center bg-[#0d1117]">
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
