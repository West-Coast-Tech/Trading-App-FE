import React, { useState, useRef, useEffect } from "react";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { registerUser, verifyRegisterOtp } from "../../actions/authActions";
import { setError } from "../../features/auth/authSlice";
import { AppState } from "../../actions/types";
import StringArrayDropdown from "./StringArrayDropdown";
import VerifyOtp from "./VerifyOtp";
import { hashPassword } from "../../services/auth";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const Register = () => {
  const navigate = useNavigate();
  const {isAuthenticated,otpToken} = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch<any>();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  // const [passwordFocus, setPasswordFocus] = useState(false);
  
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
  
  const [resendPayload,setResendPayload] = useState<{ email: string, password: string, fullName: string, currency: string, country: string }>({ email: "", password: "",fullName: "",currency: "",country: "" });

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

  // Function to toggle show/hide password
  const handleShowPassword = () => {
   setShowPassword(!showPassword);
  };

 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
  
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      dispatch(setError("Passwords do not match"))
      return;
    }
    
    const hashedPassword = await hashPassword(password);
    console.log("hashedPassword",hashedPassword)
    //create hashpassword and salt and add to payload
    // const saltRounds = 10; // You can adjust the number of rounds based on your security requirements
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create a payload object
    const payload = {
        email,
       password:hashedPassword,
        fullName,
        currency,
        country,
    };
    try {
      
      
      await dispatch(registerUser(payload)); // Dispatch the login action
      // If successful, navigate to the home page
      setResendPayload(payload)
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
    "w-[93%] sm:w-3/4 md:w-5/6 bg-gray-100 p-3 border border-[#30363d] rounded-lg ";
  const labelCssClass="block mb-2 text-white font-bold";

  const handleInputChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    // Allow only alphanumeric characters and limit to 30 characters
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (value.length <= 50 && regex.test(value)) {
      setFullName(value);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 font-roboto p-4">
  <div className="w-full max-w-md mx-auto">
    <div className="text-center pt-10">
      <img className="h-20 mx-auto" src="src/assets/buildings.svg" alt="Building Icon" />
    </div>
    <h1 className="text-2xl mb-8 text-center font-sheriff text-white">Sign Up to Trading App</h1>
    <div>
      {!otpToken ? (
        <div>
          <div className="bg-gray-100 rounded-lg shadow-2xl shadow-black p-8">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCssClass}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  ref={userRef}
                  value={fullName}
                  onChange={handleInputChange}
                  className={inputClassCSS}
                  style={{ color: "#ffffff", caretColor: "#ffffff" }}
                />
              </div>
              
              <div>
                <label className={labelCssClass}>Country</label>
                <StringArrayDropdown options={countries} onOptionSelect={handleCountrySelect} />
              </div>
              
              <div>
                <label className={labelCssClass}>Email address</label>
                <input
                  type="text"
                  placeholder="Enter your Email Address"
                  value={email}
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote" 
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className={inputClassCSS}
                  style={{ color: "#ffffff", caretColor: "#ffffff" }}
                />
                <p id="emailnote" className={`${emailFocus && email && !validEmail ? "text-red flex items-center" : "hidden"}`}>
                  <FontAwesomeIcon className="pr-2" icon={faInfoCircle} />Please enter a valid email
                </p>
              </div>  
              
              <div>
                <label className={labelCssClass}>Currency</label>
                <StringArrayDropdown options={currencies} onOptionSelect={handleCurrencySelect} />
              </div>
              
              <div>
                <label className={labelCssClass}>Password</label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onFocus={()=>setPasswordFocus(true)}
                  onBlur={()=>setPasswordFocus(false)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="pwdNote"
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClassCSS}
                  style={{ color: "#ffffff", caretColor: "#ffffff" }}
                />
                <label className={`${password ? "flex items-center mt-2 text-green-500 text-sm ":"hidden"}`}>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleShowPassword}
                    className="mr-2"
                  />
                  Show Password
                </label>
                <div
                  id="pwdNote"
                  className={`${ 
                     !validPassword  && password
                      ? "border-2 border-solid border-blue-800 text-white bg-gray-100 p-2 rounded-lg  space-y-2 text-xs w-[70%]"
                      : "hidden"
                  }`}
                >
                  <FontAwesomeIcon className="pr-2" icon={faInfoCircle} />
                  <span>Password should meet the following criteria:</span>
                  <ul className="list-disc">
                    <li>At least one lowercase letter</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one digit</li>
                    <li>At least one special character (@$!%*?&)</li>
                    <li>Minimum length of 8 characters</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <label className={labelCssClass}>Confirm Password</label>
                <input
                  required
                  type="password"
                  placeholder="Confirm your password"
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
                  style={{ color: "#ffffff", caretColor: "#ffffff" }}
                />
                {passwordError && (
                  <p className="text-red mt-2 text-sm">{passwordError}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  className="md:w-[91%] w-full py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-900 transition duration-300 ease-in-out"
                >
                  Sign Up
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
        </div>
      ) : (
        <VerifyOtp
          verifyAction={verifyRegisterOtp}
          resendAction={registerUser}
          resendPayload={resendPayload}
          message="Check your email for the otp"
        />
      )}
    </div>
    <div className="flex flex-col md:flex-row justify-around pt-16 text-center">
      <a href="/" className="text-blue-500 hover:text-blue-600 mb-2 md:mb-0">
        Terms
      </a>
      <a href="/" className="text-blue-500 hover:text-blue-600 mb-2 md:mb-0">
        Privacy
      </a>
      <a href="/" className="text-blue-500 hover:text-blue-600 mb-2 md:mb-0">
        Security
      </a>
      <a
        href="/"
        className="text-gray-500 hover:text-blue-600 hover:underline"
      >
        Contact Us
      </a>
    </div>
  </div>
</div>

  );
};

export default Register;
