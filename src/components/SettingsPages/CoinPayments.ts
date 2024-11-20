import Coinpayments from "coinpayments";
interface CoinpaymentsCredentials {
  key: string;
  secret: string;
}
const credentials: CoinpaymentsCredentials = {
  key: "6683f2d207aef13e6f8150eb5f3134ab65bedcff42cc6f33e054f7d4c63f1d0c",
  secret: "70794899d0255e5727787c83873BE78f8e90614d6E6Ba24649c03205A0161B57",
};
export const client = new Coinpayments(credentials);
