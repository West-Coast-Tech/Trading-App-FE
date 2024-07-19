import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type BuyAdjustType = {
  className?: string;
  buyAmountValue?: string;
  plus?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
  propLeft?: CSSProperties["left"];
  propRight?: CSSProperties["right"];
  propBottom?: CSSProperties["bottom"];
};

const BuyAdjust: FunctionComponent<BuyAdjustType> = ({
  className = "",
  buyAmountValue,
  plus,
  propTop,
  propLeft,
  propRight,
  propBottom,
}) => {
  const buyAdjustStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      left: propLeft,
      right: propRight,
      bottom: propBottom,
    };
  }, [propTop, propLeft, propRight, propBottom]);

  return (
    <div
      className={`w-[246px] !m-[0] absolute top-[-59px] left-[calc(50%_-_123px)] rounded-md bg-gainsboro box-border flex flex-row items-start justify-between pt-[19px] pb-5 pr-[23px] pl-[26px] gap-[20px] z-[1] text-center text-base text-grays-white font-inter border-[1px] border-solid border-darkgray-100 ${className}`}
      style={buyAdjustStyle}
    >
      <input
        className="m-0 h-6 w-6 relative rounded-81xl overflow-hidden shrink-0 min-h-[24px]"
        type="checkbox"
      />
      <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
        <b className="relative leading-[100%] inline-block min-w-[73px] whitespace-nowrap">
          {buyAmountValue}
        </b>
      </div>
      <img
        className="h-6 w-6 relative rounded-81xl overflow-hidden shrink-0 min-h-[24px]"
        alt=""
        src={plus}
      />
      <div className="h-[67px] w-[246px] relative rounded-md bg-gainsboro box-border hidden border-[1px] border-solid border-darkgray-100" />
    </div>
  );
};

export default BuyAdjust