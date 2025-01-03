import {
  faBitcoinSign,
  faCreditCard,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import APECoin from "../../../public/cyrptoIcons/apecoin.svg";
import { CryptoCard } from "./CryptoCard";

const iconPath = "/cryptoIcons/";

const cryptoItems = [
  { title: "Bitcoin (BTC)", code: "BTC" },
  { title: "Binance Pay", code: "binance" },
  { title: "USD Tether (TRC-20)", code: "USDTTRC20" },
  { title: "USD Tether (ERC-20)", code: "USDTERC20" },
  { title: "USD Tether (Polygon)", code: "USDTMATIC" },
  { title: "USD Coin (Polygon)", code: "USDCMATIC" },
  //   { title: "USD Coin (ERC-20)", code: "usdc" },
  //   { title: "USD Tether (BEP-20)", code: "usdt_bep20" },
  { title: "Ethereum (ETH)", code: "ETH" },
  { title: "Litecoin (LTC)", code: "LTC" },
  { title: "Bitcoin Cash", code: "BCH" },
  { title: "Tron (TRX)", code: "TRX" },
  { title: "Dash", code: "DASH" },
  // { title: "Polygon (MATIC)", code: "MATIC" },
  // { title: "Dai", code: "DAI" },
  { title: "Solana", code: "SOL" },
  { title: "Polkadot", code: "DOT" },
  { title: "Shiba Inu (ERC-20)", code: "SHIB" },
  { title: "Zcash (ZEC)", code: "ZEC" },
  { title: "Dogecoin", code: "DOGE" },
  { title: "Ripple", code: "XRP" },
  { title: "ApeCoin (APE)", code: "APE" },
  { title: "Uniswap (UNI)", code: "UNI" },
  { title: "Avalanche (AVAX)", code: "AVAX" },
];

const Deposit = () => {
  return (
    // <div className="grid grid-cols-5 text-tBase mt-4">
    //   <div className="col-span-1">
    //     <div className="flex flex-row gap-2 items-center justify-center">
    //       <FontAwesomeIcon icon={faCreditCard} />
    //       <h3 className="my-0 "> Bank Cards</h3>
    //     </div>
    //   </div>
    <div className="text-tBase space-y-4">
      <div className="flex flex-row gap-2 items-center justify-center">
        <FontAwesomeIcon icon={faBitcoinSign} />
        <h3 className="my-0 "> Crypto Payments</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-4">
        {cryptoItems.map((item) => (
          <CryptoCard
            key={item.code}
            title={item.title}
            icon={<img src={`${iconPath}${item.code}.svg`} alt={item.title} />}
            url={item.code}
          />
        ))}
      </div>
    </div>
    //   <div className="col-span-1">
    //     <div className="flex flex-row gap-2 items-center justify-center">
    //       <CreditCard />
    //       <h3 className="my-0 "> E Payments</h3>
    //     </div>
    //   </div>
    // </div>
  );
};
export default Deposit;
