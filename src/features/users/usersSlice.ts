import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../actions/types";

export interface UserState {
  currentUser: UserData | null;
  users: Array<{ id: string; email: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersSuccess: (
      state,
      action: PayloadAction<{ id: string; email: string }[]>
    ) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadUser: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const { getUsersSuccess, getUsersFail, getUsersStart, loadUser } =
  userSlice.actions;

export default userSlice.reducer;
