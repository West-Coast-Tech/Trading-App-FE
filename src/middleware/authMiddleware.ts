// src/middleware/authMiddleware.ts
import { Middleware, Dispatch } from 'redux';
import { logoutSuccess } from '../features/authSlice';
import { MiddlewareAPI } from 'redux';
import  isTokenExpired  from '../utils/tokenUtils';

const authMiddleware: Middleware = (storeApi: MiddlewareAPI) => {
  return (next) => (action: any) => {
    if (action.type.startsWith('api/call')) { // Assuming your API calls start with 'api/call'
      const token = storeApi.getState().auth.token;
      if (isTokenExpired(token)) {
        // Token is expired, dispatch logoutSuccess
        (storeApi as any).dispatch(logoutSuccess());
      }
    }
    return next(action);
  };
};

export default authMiddleware;