// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  currentUser: { email: string } | null;
  id: string | null; // User ID is now part of the state
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  id: localStorage.getItem('id'), // Initialize with value from localStorage
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<{ token: string; email: string; id: string }>) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('id', action.payload.id); // Save user ID to localStorage
      state.token = action.payload.token;
      state.id = action.payload.id; // Update state with user ID
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; email: string; id: string }>) => {
      localStorage.setItem('token', action.payload.token);
      console.log("token saved",action.payload.token)
      localStorage.setItem('id', action.payload.id); // Save user ID to localStorage
      console.log("id saved",action.payload.id)
      state.token = action.payload.token;
      state.id = action.payload.id; // Update state with user ID
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
    },
    registerFail: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('id'); // Remove user ID from localStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    loginFail: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('id'); // Remove user ID from localStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    authError: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('id'); // Remove user ID from localStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    logoutSuccess: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('id'); // Remove user ID from localStorage
      state.token = null;
      state.id = null; // Reset user ID in state
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    refreshSuccess: (state, action: PayloadAction<{ token: string }>) => {
      console.log("saving token to local storage",action.payload.token)
      localStorage.setItem('token', action.payload.token);
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
} = authSlice.actions;

export default authSlice.reducer;
