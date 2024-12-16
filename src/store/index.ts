// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../features/auth/authSlice";
import errorReducer from "../features/errorSlice";
import usersReducer from "../features/users/usersSlice";
import symbolReducer from "../features/symbol/symbolSlice";
import tradingDataReducer from "../features/tradingData/tradingDataSlice";
import tradeDataReducer from "../features/trades/tradeSlice";
import accountDataReducer from "../features/accounts/accountSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
    users: usersReducer,
    symbols: symbolReducer,
    tradingData: tradingDataReducer,
    trades: tradeDataReducer,
    accounts: accountDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
