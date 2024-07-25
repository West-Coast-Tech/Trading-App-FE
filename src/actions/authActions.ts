// src/actions/authActions.ts
import { Dispatch } from "redux";
import { registerSuccess, loginSuccess, registerFail, loginFail, authError, userLoaded, logoutSuccess, refreshSuccess } from "../features/authSlice";
import { LoginData, RegisterData, UserData } from "./types";
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

// Action to refresh token
export const refreshToken = () => async (dispatch: Dispatch) => {
  console.log("refreshing token...")
  // Retrieve the user's ID from localStorage
  const id = localStorage.getItem('id');
  console.log("id",id);
  if (!id) {  
    console.log("ID not found in localStorage");
    // Handle the case where the ID is not found in localStorage
    // This could mean the user is not logged in, or the ID was not properly saved
    dispatch(authError());
    return;
  }

  try {
    // Call the refresh token API endpoint, passing the user's ID as needed
    // Note: You might need to adjust this based on how your API expects the ID to be passed
    const response = await API.refreshToken(id);
    // Assuming the response includes the refreshed token and possibly other user details
   
    console.log("refresh success",response);
    // Dispatch the loginSuccess action with the refreshed token and user details
    dispatch(refreshSuccess(response.data));
  } catch (err) {
    // Handle errors, such as network issues or invalid tokens
    dispatch(authError());
  }
};