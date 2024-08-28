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
      className={`w-full !m-[0] relative top-[0px] left-[0px] overflow-hidden shrink-0 flex flex-row items-start justify-between  box-border gap-[20px] text-center text-xl text-white mq1450:flex-wrap ${className}`}
    >
    <div className="flex flex-row items-start justify-between">
        <div className="w-[215px] flex flex-row items-start justify-start gap-[20px]">
          <img
            className="h-14 w-[54px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src={logo}
          />
          <div className="flex-1 flex flex-col items-start justify-start pt-[12.5px] px-0 pb-0">
            <b className="self-stretch relative leading-[23px] mq450:text-base mq450:leading-[16px]">
              WEST COAST
            </b>
          </div>
        </div>
      </div>
      {/* <Button
        className="h-[60px] w-[269px]"
        startIcon={<img width="32rem" height="59rem" src={bell} />}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "1.2rem",
          background: "#18ac00",
          borderRadius: "95px",
          "&:hover": { background: "#18ac00" },
          width: 269,
          height: 60,
          
        }}
      >
        30%
      </Button> */}
      <div className="flex flex-row items-start justify-start gap-[3.656rem] max-w-full mq825:flex-wrap mq825:gap-[1.813rem] pr-5">
        <div className="w-[4.219rem] flex flex-col items-start justify-start py-0 pr-[0.688rem] pl-0 box-border">
          <div className="self-stretch rounded-[1.25rem] bg-border-brand-default overflow-hidden flex flex-row items-center justify-center py-2.5 px-[0.688rem] border-[0.063rem] border-solid border-border-brand-default">
            <img
              className="h-[1.875rem] w-8 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src={star}
            />
          </div>
        </div>
        {/* <div>
          <Button
            id="button-undefined"
            aria-controls="menu-undefined"
            aria-haspopup="true"
            aria-expanded={frameDropdownOpen ? "true" : undefined}
            onClick={handleFrameDropdownClick}
            color="primary"
            sx={{ width: "195", height: "47" }}
          />
          <Menu
            anchorEl={frameDropdownAnchorEl}
            open={frameDropdownOpen}
            onClose={handleFrameDropdownClose}
            className="bg-white"
            
          />
        </div> */}
        <button className="px-5 py-4 mt-1 rounded-lg bg-blue-600 hover:bg-gray-100 cursor-pointer text-white" onClick={handleLogout}>Logout</button>

        <div className="w-[16rem] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
          <div className="self-stretch flex flex-row items-start justify-start gap-[0.5rem]">
            <div className="flex-[0.931] rounded-xl bg-green overflow-hidden flex flex-row items-start justify-start py-[0.91rem] px-[0.563rem] whitespace-nowrap">
              <b className="flex-1 relative leading-[100%]">+ Deposit</b>
            </div>
            <div className="flex-1 rounded-xl bg-border-brand-default overflow-hidden flex flex-row items-start justify-start py-[0.813rem] px-[0.313rem]">
              <b className="flex-1 relative leading-[100%] inline-block min-w-[7.375rem] mq450:text-base mq450:leading-[1rem]">
                Withdrawal
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar