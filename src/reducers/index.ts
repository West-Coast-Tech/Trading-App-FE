//DONT NEED THIS SUBJECT TO DELETION

import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import errorReducer, { ErrorState } from './errorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
});

export type RootState = {
  auth: AuthState;
  errors: ErrorState;
};

export default rootReducer;
