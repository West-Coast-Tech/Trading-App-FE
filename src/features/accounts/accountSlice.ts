import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountsData } from "../../actions/types";

export interface AccountState {
  accounts: Array<AccountsData>;
  selectedAccount: AccountsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  loading: false,
  error: null,
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    getAccountsSuccess: (state, action: PayloadAction<AccountsData[]>) => {
      state.accounts = action.payload;
      state.loading = false;
    },
    getAccountsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAccountsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    selectAccount: (state, action: PayloadAction<AccountsData>) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const {
  getAccountsSuccess,
  getAccountsFail,
  getAccountsStart,
  selectAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
