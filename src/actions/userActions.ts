// src/actions/userActions.ts
import API from "../utils/API";
import { Dispatch } from "redux";
import { GET_USERS_FAIL, UserData } from "./types";
import { getUsersSuccess, loadUser } from "../features/users/usersSlice";

export const getUsers = () => async (dispatch: Dispatch) => {
  try {
    const token = sessionStorage.getItem("token") || "";

    const response = await API.getUsers(token); // Assuming the token is automatically handled by the interceptor
    dispatch(getUsersSuccess(response.data));
  } catch (err: any) {
    console.error("Error fetching users:", err);
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.response ? err.response.data : "Failed to fetch users",
    });
  }
};

export const getUserData = () => async (dispatch: Dispatch) => {
  try {
    const token = sessionStorage.getItem("token") || "";
    const userId = sessionStorage.getItem("id") || "";
    console.log("userId", userId);
    const response = await API.loadUser(token, userId);
    dispatch(loadUser(response.data));
  } catch (error) {
    console.error("Error fetching User Data", error);
  }
};

export const updateUser =
  (name: string, dateOfBirth: string) => async (dispatch: Dispatch) => {
    try {
      const token = sessionStorage.getItem("token") || "";
      const userId = sessionStorage.getItem("id") || "";
      const response = await API.updateUser(token, userId, name, dateOfBirth);
      dispatch(loadUser(response.data));
    } catch (error) {
      console.error("Error updating user");
    }
  };
