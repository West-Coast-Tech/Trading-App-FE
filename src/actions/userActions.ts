// src/actions/userActions.ts
import API from "../utils/API";
import { Dispatch } from "redux";
import { GET_USERS_FAIL, UserData } from "./types";
import {
  addFavoriteSuccess,
  documentUploadSuccess,
  getUsersSuccess,
  loadUser,
  removeFavoriteSuccess,
} from "../features/users/usersSlice";

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
export const uploadDocuments =
  (files: File[]) => async (dispatch: Dispatch) => {
    try {
      const formData = new FormData();
      console.log("Files", files);

      Array.from(files).forEach((file) => {
        formData.append("documents", file);
      });

      // Get user token if authentication is required
      const token = sessionStorage.getItem("token") || "";
      console.log("Uploading documents", formData);
      const response = await API.uploadDocuments(token, formData);
      console.log("response to upload documents", response);
      dispatch(documentUploadSuccess(response.data.documents));
    } catch (error: any) {
      console.error("Error uploading documents", error);
    }
  };

export const addFavoriteSymbols =
  (symbolId: string) => async (dispatch: Dispatch) => {
    try {
      const token = sessionStorage.getItem("token") || "";
      const userId = sessionStorage.getItem("id") || "";
      const response = await API.addFavoriteSymbol(token, symbolId, userId);
      console.log("Response add favorite", response);
      dispatch(addFavoriteSuccess(response.data));
    } catch (error) {
      console.error("Error adding Symbol to Favorite", error);
    }
  };
export const removeFavoriteSymbol =
  (symbolId: string) => async (dispatch: Dispatch) => {
    try {
      const token = sessionStorage.getItem("token") || "";
      const userId = sessionStorage.getItem("id") || "";
      const response = await API.removeFavoriteSymbol(token, symbolId, userId);
      dispatch(removeFavoriteSuccess(response.data));
    } catch (error) {
      console.error("Error adding Symbol to Favorite", error);
    }
  };
