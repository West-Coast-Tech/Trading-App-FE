import TradeDeal from "./TradeDeal";
import TradeHistory from "./TradeHistory";

const RightBar = () => {
  return (
    <div className="md:h-[89vh] md:w-full flex flex-col gap-4">
      {/* TradeDeal with fixed height */}
      <div className="md:h-[23rem] h-[26vh] bg-background rounded-lg border-solid border-[1px] border-borderColor">
        <TradeDeal />
      </div>

      {/* TradeHistory takes up remaining space with scroll */}
      <div className="flex-1 md:flex hidden bg-background rounded-lg border-solid border-[1px] border-borderColor overflow-hidden">
        <TradeHistory />
      </div>
    </div>
  );
};

export default RightBar;
