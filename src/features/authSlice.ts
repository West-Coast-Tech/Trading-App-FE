// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  currentUser: { email: string } | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<{ token: string; email: string }>) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; email: string }>) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
    },
    registerFail: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    loginFail: state => {
      console.log('login fail');
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    authError: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    logoutSuccess: state => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    userLoaded: (state, action: PayloadAction<{ email: string }>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const {
  registerSuccess,
  loginSuccess,
  registerFail,
  loginFail,
  authError,
  logoutSuccess,
  userLoaded,
} = authSlice.actions;

export default authSlice.reducer;
