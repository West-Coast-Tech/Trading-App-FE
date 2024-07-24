// src/actions/authActions.ts
import { Dispatch } from "redux";
import { registerSuccess, loginSuccess, registerFail, loginFail, authError, userLoaded, logoutSuccess } from "../features/authSlice";
import { LoginData, RegisterData } from "./types";
import API from "../utils/API"; // Import the updated API client

// Action to register new users
export const registerUser = (data: RegisterData) => async (dispatch: Dispatch) => {
  try {
    const response = await API.register(data);
    dispatch(registerSuccess(response.data));
  } catch (err: any) {
    dispatch(authError(err.message));
    dispatch(registerFail());
  }
};

// Action to login users
export const loginUser = (data: LoginData) => async (dispatch: Dispatch) => {
  try {
    const response = await API.login(data);
    dispatch(loginSuccess(response.data));
  } catch (err: any) {
    dispatch(authError(err.message));
    dispatch(loginFail());
  }
};

// Action to load current user
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const response = await API.loadUser();
    dispatch(userLoaded(response.data));
  } catch (err) {
    dispatch(authError());
  }
};

// Action to logout user
export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch(logoutSuccess());
};
