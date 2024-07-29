// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  currentUser: { email: string } | null;
  id: string | null;
  otpToken: string | null;
  error:string|null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token'),
  isAuthenticated: !!sessionStorage.getItem('token'),
  id: sessionStorage.getItem('id'), // Initialize with value from sessionStorage
  currentUser: null,
  otpToken: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<{ token: string; email: string; id: string }>) => {
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('id', action.payload.id); // Save user ID to sessionStorage
      state.token = action.payload.token;
      state.id = action.payload.id; // Update state with user ID
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
      state.error = null;
    },
    otpLoaded: (state, action: PayloadAction<{ otpToken: string}>) => {
      state.otpToken = action.payload.otpToken;
      state.error = null;
    },
    otpFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },

    loginSuccess: (state, action: PayloadAction<{ token: string; email: string; id: string }>) => {
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('id', action.payload.id); // Save user ID to sessionStorage
      state.token = action.payload.token;
      state.id = action.payload.id; // Update state with user ID
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
      state.otpToken = null;
      state.error = null;

    },
    registerFail: (state, action: PayloadAction<string>) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = action.payload
    },
    loginFail: (state, action: PayloadAction<string>) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      console.log("login fail authlice.ts",action.payload)
      state.error = action.payload
    },
    authError: state => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    logoutSuccess: state => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error= null;
    },
    refreshSuccess: (state, action: PayloadAction<{ token: string }>) => {
      console.log("saving token to local storage",action.payload.token)
      sessionStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    userLoaded: (state, action: PayloadAction<{ email: string; id: string }>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.id = action.payload.id; // Update user ID in state
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
  refreshSuccess,
  otpLoaded,
  otpFailed
} = authSlice.actions;

export default authSlice.reducer;
