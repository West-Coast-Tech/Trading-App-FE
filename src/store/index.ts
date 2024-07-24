// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import errorReducer from '../features/errorSlice';
import usersReducer from '../features/users/usersSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
    users: usersReducer,
  },
  // No need to manually add redux-thunk here since it's included by default
  // If you had a custom middleware, you could modify getDefaultMiddleware like this:
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(myCustomMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
