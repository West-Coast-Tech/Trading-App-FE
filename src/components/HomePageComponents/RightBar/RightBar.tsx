import TradeDeal from './TradeDeal';
import TradeHistory from './TradeHistory';

const RightBar = () => {
    return (
        <div className="h-full w-full flex flex-col gap-4">
            <div className="h-[23rem] bg-background rounded-lg border-solid border-[1px] border-borderColor ">
                <TradeDeal />
            </div>
            <div className="flex-auto bg-background rounded-lg border-solid border-[1px] border-borderColor ">
                <TradeHistory />
            </div>
        </div>
    );
};

export default RightBar;
