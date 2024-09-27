import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TradesData } from "../../actions/types";

export interface TradeState {
  allTrades: Array<TradesData>;
  loading: boolean;
  error: string | null;
}

const initialState: TradeState = {
  allTrades: [],
  loading: false,
  error: null,
};

export const tradeSlice = createSlice({
  name: "tradeData",
  initialState,
  reducers: {
    // Fetching trades (already implemented)
    getTradesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTradesSuccess: (state, action: PayloadAction<TradesData[]>) => {
      state.allTrades = action.payload;
      state.loading = false;
    },
    getTradesFail: (state, action: PayloadAction<string>) => {
      state.allTrades = [];
      state.error = action.payload;
      state.loading = false;
    },

    // Adding a new trade
    addTradeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTradeSuccess: (state, action: PayloadAction<TradesData>) => {
      state.allTrades.push(action.payload);
      state.loading = false;
    },
    addTradeFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Updating a trade when it is completed
    updateTradeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTradeSuccess: (state, action: PayloadAction<any>) => {
      const index = state.allTrades.findIndex(
        (trade) => trade.ticketNo === action.payload.ticketNo
      );
      if (index !== -1) {
        state.allTrades[index].closingPrice = action.payload.closingPrice;
        state.allTrades[index].pnlValue = action.payload.pnlValue;
        state.allTrades[index].isComplete = action.payload.isComplete;
      }
      state.loading = false;
    },
    updateTradeFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Deleting a trade
    deleteTradeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTradeSuccess: (state, action: PayloadAction<string>) => {
      state.allTrades = state.allTrades.filter(
        (trade) => trade.ticketNo !== action.payload
      );
      state.loading = false;
    },
    deleteTradeFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Reset the state (optional but useful in some cases)
    resetTradesState: (state) => {
      state.allTrades = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Export the actions for dispatching in your components
export const {
  getTradesStart,
  getTradesSuccess,
  getTradesFail,
  addTradeStart,
  addTradeSuccess,
  addTradeFail,
  updateTradeStart,
  updateTradeSuccess,
  updateTradeFail,
  deleteTradeStart,
  deleteTradeSuccess,
  deleteTradeFail,
  resetTradesState,
} = tradeSlice.actions;

export default tradeSlice.reducer;
