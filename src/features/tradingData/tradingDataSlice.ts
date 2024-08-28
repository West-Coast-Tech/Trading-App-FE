import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for the symbol data
import { TradingData } from '../../actions/types';
// Define the initial state for the symbol slice
export interface TradingDataState {
  tradingData: Array<TradingData>;
  loading: boolean;
  error: string | null;
}

const initialState: TradingDataState = {
  tradingData: [],
  loading: false,
  error: null,
};
export const tradingDataSlice = createSlice({
  name: 'tradingData',
  initialState,
  reducers: {
    getTradingDataSuccess: (state, action: PayloadAction<Array<TradingData>>) => {
      state.tradingData = action.payload;
      state.loading = false;
    },
    getTradingDataFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getTradingDataStart: state => {
      state.loading = true;
      state.error = null;
    },
   
  },
});

// Export actions
export const { getTradingDataSuccess, getTradingDataFail, getTradingDataStart } = tradingDataSlice.actions;

// Export the reducer
export default tradingDataSlice.reducer;