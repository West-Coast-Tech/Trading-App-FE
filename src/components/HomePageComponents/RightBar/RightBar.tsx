import TradeDeal from './TradeDeal';
import TradeHistory from './TradeHistory';

const RightBar = () => {
    return (
        <div className="h-full w-full flex flex-col gap-4">
            {/* TradeDeal with fixed height */}
            <div className="h-[23rem] bg-background rounded-lg border-solid border-[1px] border-borderColor">
                <TradeDeal />
            </div>

            {/* TradeHistory takes up remaining space with scroll */}
            <div className="flex-1 bg-background rounded-lg border-solid border-[1px] border-borderColor overflow-hidden">
                <TradeHistory />
            </div>
        </div>
    );
};

export default RightBar;
