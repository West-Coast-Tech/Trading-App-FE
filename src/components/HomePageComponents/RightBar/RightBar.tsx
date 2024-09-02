import TradeDeal from './TradeDeal';
import TradeHistory from './TradeHistory';

const RightBar = () => {
    return (
        <div className="h-full w-full flex flex-col gap-4">
            <div className="h-[23rem] bg-secondary rounded-lg">
                <TradeDeal />
            </div>
            <div className="flex-auto bg-secondary rounded-lg">
                <TradeHistory />
            </div>
        </div>
    );
};

export default RightBar;
