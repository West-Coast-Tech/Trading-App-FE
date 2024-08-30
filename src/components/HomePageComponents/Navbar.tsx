import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import logo from "../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import star from "../../assets/star.svg";
export type NavbarType = {
  className?: string;
};

const Navbar: FunctionComponent<NavbarType> = ({ className = "" }) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <div
      className={`w-full m-0 relative top-0 left-0 overflow-hidden shrink-0 flex flex-row items-center justify-between box-border gap-5 text-center text-xl ${className}`}
    >
      <div className="flex flex-row items-center justify-start">
        <div className="w-[215px] flex flex-row">
          <img
            className="h-12 relative overflow-hidden shrink-0 text-primary"
            loading="lazy"
            alt="Logo"
            src={logo}
          />
          <div className="flex-1 flex flex-col items-start justify-start pt-[12.5px] px-0 pb-0">
            <b className="relative leading-[23px]">WEST COAST</b>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-start gap-16 max-w-full">
        <div className="flex flex-row items-center gap-4">
          <div className="h-[2.5rem] w-[4rem] flex items-center justify-center rounded-[1.25rem] bg-border-brand-default border-[1px] border-solid border-border-brand-default">
            <img
              className="h-8 w-8 relative overflow-hidden"
              loading="lazy"
              alt="Star"
              src={star}
            />
          </div>
          <button 
            className="h-[2.5rem] w-[8rem] rounded-lg bg-blue-600 hover:bg-gray-100 text-white flex items-center justify-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="flex flex-row items-center gap-3 w-[12rem]">
          <div className="h-[2.5rem] rounded-md bg-green-600 flex items-center justify-center w-full">
            <b className="text-tBase text-[0.875rem]">+ Deposit</b>
          </div>
          <div className="h-[2.5rem] rounded-md bg-secondary flex items-center justify-center px-2 w-full">
            <b className="text-tBase text-[0.875rem]">Withdrawal</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
