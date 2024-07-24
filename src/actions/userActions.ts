// src/actions/userActions.ts

import API from "../utils/API";
import { Dispatch } from "redux";
import { GET_USERS_SUCCESS, GET_USERS_FAIL, UserActionTypes } from "./types";
import { getUsersSuccess } from "../features/users/usersSlice";
import  isTokenExpired  from "../utils/tokenUtils";
import history from "../customHistory";
export const getUsers = () => async (dispatch: Dispatch, getState: () => { auth: { token: string } }) => {
    const token = getState().auth.token;
    console.log("this is token in getUsers")
    if (isTokenExpired(token)) {
        console.log("istoken expired condition",isTokenExpired(token))
        localStorage.removeItem('token')
        dispatch({ type: GET_USERS_FAIL, payload: 'Token expired' });
        history.push('/login'); // Redirect to login page
        return;
      }
    
    try {
    
      console.log("api call users", token);
    
      const response = await API.getUsers(token);
      console.log("response from get users", response);
      dispatch(getUsersSuccess(response.data));
    } catch (err: any) {
      dispatch({
        type: GET_USERS_FAIL,
        payload: err.response.data,
      });
    }
  };
