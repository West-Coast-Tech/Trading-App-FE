import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for the symbol data
import { SymbolData } from '../../actions/types';
// Define the initial state for the symbol slice
export interface SymbolState {
  symbols: Array<SymbolData>;
  selectedSymbol: SymbolData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SymbolState = {
  symbols: [],
  selectedSymbol: null,
  loading: false,
  error: null,
};

// Create the symbol slice
export const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    getSymbolsSuccess: (state, action: PayloadAction<SymbolData[]>) => {
      state.symbols = action.payload;
      console.log("symbols",state.symbols)
      state.loading = false;
    },
    getSymbolsFail: (state, action: PayloadAction<string>) => {
      state.symbols = []
      state.error = action.payload;
      state.loading = false;
    },
    getSymbolsStart: state => {
      state.loading = true;
      state.error = null;
    },
    selectSymbol: (state, action: PayloadAction<SymbolData>) => {
      state.selectedSymbol = action.payload;
    },
    clearSelectedSymbol: state => {
      state.selectedSymbol = null;
    },
  },
});

export const { getSymbolsSuccess, getSymbolsFail, getSymbolsStart, selectSymbol, clearSelectedSymbol } = symbolSlice.actions;

export default symbolSlice.reducer;
