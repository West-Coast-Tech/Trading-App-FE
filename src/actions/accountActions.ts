// src/actions/userActions.ts
import API from "../utils/API";
import { Dispatch } from "redux";
import {
  getAccountsStart,
  getAccountsSuccess,
  getAccountsFail,
} from "../features/accounts/accountSlice";

export const getAccounts = () => async (dispatch: Dispatch) => {
  try {
    const token = sessionStorage.getItem("token") || "";
    const userId = sessionStorage.getItem("id") || "";
    dispatch(getAccountsStart());
    const response = await API.getAccounts(token, userId); // Assuming the token is automatically handled by the interceptor
    dispatch(getAccountsSuccess(response.data));
  } catch (err: any) {
    console.error("Error fetching users:", err);
    dispatch(getAccountsFail(err.response?.data || "Failed to fetch accounts"));
  }
};
