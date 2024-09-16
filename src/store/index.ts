// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '../features/auth/authSlice';
import errorReducer from '../features/errorSlice';
import usersReducer from '../features/users/usersSlice';
import symbolReducer from '../features/symbol/symbolSlice';
import tradingDataReducer from '../features/tradingData/tradingDataSlice'
import tradeDataReducer from '../features/trades/tradeSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
    users: usersReducer,
    symbols: symbolReducer,
    tradingData: tradingDataReducer,
    trades: tradeDataReducer,
  },
  // No need to manually add redux-thunk here since it's included by default
  // If you had a custom middleware, you could modify getDefaultMiddleware like this:
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(myCustomMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
