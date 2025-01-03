//src/actions/types.ts

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

import { AuthState } from "../features/auth/authSlice";
import { ErrorState } from "../features/errorSlice";
import { UserState } from "../features/users/usersSlice";
import { SymbolState } from "../features/symbol/symbolSlice";
import { TradingDataState } from "../features/tradingData/tradingDataSlice";
import { TradeState } from "../features/trades/tradeSlice";
import { AccountState } from "../features/accounts/accountSlice";
// User data interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
  dateOfBirth: string | null;
  emailStatus: string | null;
  userStatus: string | null;
  country: string | null;
  documents: File[] | null;
  favoriteSymbols: string[] | null;
  activeStatus: string;
}

// Error data interface
export interface ErrorData {
  msg: string;
  status: number;
}

// Login data interface
export interface LoginData {
  email: string;
  password: string;
}
export interface OtpData {
  otp: string;
  otpToken: string;
}

export interface ResetData {
  resetToken: string;
  id: string;
  newPassword: string;
}
// Register data interface
export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  currency: string;
  country: string;
  dateOfBirth: string | null;
}

export interface SymbolData {
  _id: string;
  name: string;
  type: string;
  description: string;
  createdAt: string | null;
}
export interface TradingData {
  timeStamps: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface TradesData {
  ticketNo: string;
  symbol: string;
  currency: string;
  tradeDirection: string;
  amountInvested: number;
  openingPrice: number | null;
  closingPrice: number | null;
  openingTime: string;
  closingTime: string;
  isComplete: boolean;
  pnlValue: number | null;
  accountNo: string;
}

export interface TransactionsData {
  accountNo: string;
  amount: number;
  currency: string;
  transactionType: "deposit" | "withdrawal";
  sourceCurrency: string;
  finalBalance: number;
  status: "pending" | "completed" | "failed";
  merchant: string;
}

export interface AccountsData {
  equity: number;
  accountType: string;
  accNo: string;
  currency: string;
}

export interface INowPaymentRecord {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  amount_received: number;
  pay_currency: string;

  ipn_callback_url?: string;
  created_at?: string;
  updated_at?: string;
  purchase_id?: string;
  network?: string;
  expiration_estimate_date?: string;
  is_fixed_rate?: boolean;
  is_fee_paid_by_user?: boolean;
  valid_until?: string;
  type?: string;
  product?: string;
}
// Define the overall shape of your Redux store state
export interface AppState {
  auth: AuthState;
  errors: ErrorState;
  users: UserState;
  symbols: SymbolState;
  tradingData: TradingDataState;
  trades: TradeState;
  accounts: AccountState;
  // Add other slices of state as needed
}

// Action type interfaces
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: UserData;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: UserData;
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
}

interface GetErrorsAction {
  type: typeof GET_ERRORS;
  payload: ErrorData;
}

interface ClearErrorsAction {
  type: typeof CLEAR_ERRORS;
}

interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  payload: UserData[];
}

interface GetUsersFailAction {
  type: typeof GET_USERS_FAIL;
  payload: string;
}

// Exporting action types
export type AuthActionTypes =
  | LoginSuccessAction
  | RegisterSuccessAction
  | LoginFailAction
  | RegisterFailAction
  | LogoutSuccessAction
  | UserLoadedAction
  | AuthErrorAction;

export type ErrorActionTypes = GetErrorsAction | ClearErrorsAction;

export type UserActionTypes = GetUsersSuccessAction | GetUsersFailAction;
