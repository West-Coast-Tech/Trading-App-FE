// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import errorReducer from '../features/errorSlice';
import usersReducer from '../features/users/usersSlice';
import authMiddleware from '../middleware/authMiddleware'; // Import the authMiddleware

export const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
    users: usersReducer,
  },
  // Include the authMiddleware in the middleware array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
