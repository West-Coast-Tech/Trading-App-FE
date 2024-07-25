import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  users: Array<{ id: string; email: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersSuccess: (state, action: PayloadAction<{ id: string; email: string }[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUsersStart: state => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { getUsersSuccess, getUsersFail, getUsersStart } = userSlice.actions;

export default userSlice.reducer;
