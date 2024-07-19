import { FunctionComponent, useState } from "react";
import { Button, Menu } from "@mui/material";
import logo from "../../assets/logo.svg";

export type NavbarType = {
  className?: string;
};

const Navbar: FunctionComponent<NavbarType> = ({ className = "" }) => {
  
  return (
    <div
      className={`w-full !m-[0] relative top-[0px] left-[0px] overflow-hidden shrink-0 flex flex-row items-start justify-between  box-border gap-[20px] text-center text-xl text-white font-inter mq1450:flex-wrap ${className}`}
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
      <Button
        className="h-[60px] w-[269px]"
        startIcon={<img width="58px" height="59px" src="/rocket-1.svg" />}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "16",
          background: "#18ac00",
          borderRadius: "95px",
          "&:hover": { background: "#18ac00" },
          width: 269,
          height: 60,
        }}
      >
        30%
      </Button>
      <div className="flex flex-row items-start justify-start gap-[58.5px] max-w-full mq825:flex-wrap mq825:gap-[29px]">
        <div className="w-[67.5px] flex flex-col items-start justify-start py-0 pr-[11px] pl-0 box-border">
          <div className="self-stretch rounded-[20px] bg-border-brand-default overflow-hidden flex flex-row items-center justify-center py-2.5 px-[11px] border-[1px] border-solid border-border-brand-default">
            <img
              className="h-[30px] w-8 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/bell.svg"
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
        <div className="w-[263px] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
          <div className="self-stretch flex flex-row items-start justify-start gap-[9px]">
            <div className="flex-[0.931] rounded-xl bg-limegreen overflow-hidden flex flex-row items-start justify-start py-[12.5px] px-[9px] whitespace-nowrap">
              <b className="flex-1 relative leading-[100%]">+ Deposit</b>
            </div>
            <div className="flex-1 rounded-xl bg-border-brand-default overflow-hidden flex flex-row items-start justify-start py-[13px] px-[5px]">
              <b className="flex-1 relative leading-[100%] inline-block min-w-[118px] mq450:text-base mq450:leading-[16px]">
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