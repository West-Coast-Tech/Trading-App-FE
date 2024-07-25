// src/actions/userActions.ts
import API from "../utils/API";
import { Dispatch } from "redux";
import {  GET_USERS_FAIL  } from "./types";
import { getUsersSuccess } from "../features/users/usersSlice";


export const getUsers = () => async (dispatch: Dispatch) => {
    try {

        const token = localStorage.getItem("token") || "";
        console.log("token in getUsers userActions",token)
        const response = await API.getUsers(token); // Assuming the token is automatically handled by the interceptor
        dispatch(getUsersSuccess(response.data));
    } catch (err: any) {
        console.error("Error fetching users:", err);
        dispatch({
            type: GET_USERS_FAIL,
            payload: err.response ? err.response.data : 'Failed to fetch users',
        });
    }
};
