// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  currentUser: { email: string } | null;
  id: string | null;
  otpToken: string | null;
  error:string|null;
  loading: boolean;
  resetToken: string | null
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token'),
  isAuthenticated: !!sessionStorage.getItem('token'),
  id: sessionStorage.getItem('id'), // Initialize with value from sessionStorage
  currentUser: null,
  otpToken: null,
  error: null,
  loading: false,
  resetToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingStart: state => {
      state.loading = true;
      console.log("loading start",state.loading)
    },
    registerSuccess: (state, action: PayloadAction<{ token: string; email: string; id: string }>) => {
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('id', action.payload.id); // Save user ID to sessionStorage
      state.token = action.payload.token;
      state.id = action.payload.id; // Update state with user ID
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    resetState: state => {
      return initialState;
    },
    resetVerificationSuccess: (state, action: PayloadAction<{ id: string, passwordResetToken: string }>) => {
      state.resetToken = action.payload.passwordResetToken;
      console.log("resetVerification success",action.payload.passwordResetToken)
      state.id=action.payload.id
      state.error = null;
      state.loading = false;
    },
    otpLoaded: (state, action: PayloadAction<{ otpToken: string}>) => {
      console.log("otptoken",action.payload.otpToken)
      state.otpToken = action.payload.otpToken;
      state.error = null;
      state.loading = false;
    },
    otpFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
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
      state.loading = false;
    },
    registerFail: (state, action: PayloadAction<string>) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = action.payload;
      state.loading = false;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      console.log("login fail authlice.ts",action.payload)
      state.error = action.payload;
      state.loading = false;
    },
    authError: state => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      state.loading = false;
    },
    logoutSuccess: state => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id'); // Remove user ID from sessionStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error= null;
      state.loading = false;
    },
    refreshSuccess: (state, action: PayloadAction<{ token: string }>) => {
      console.log("saving token to local storage",action.payload.token)
      sessionStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    userLoaded: (state, action: PayloadAction<{ email: string; id: string }>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.id = action.payload.id; // Update user ID in state
    },
  },
});

export const {
  loadingStart,
  registerSuccess,
  loginSuccess,
  registerFail,
  loginFail,
  authError,
  logoutSuccess,
  userLoaded,
  refreshSuccess,
  otpLoaded,
  otpFailed,
  resetVerificationSuccess,
  resetState
} = authSlice.actions;

export default authSlice.reducer;
