//src/actions/types.ts


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

import { AuthState } from "../features/authSlice";
import { ErrorState } from "../features/errorSlice";
import { UserState } from "../features/users/usersSlice";

// User data interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Error data interface
export interface ErrorData {
  msg: string;
  status: number;
}

// Login data interface
export interface LoginData {
  email: string;
  password: string;
}

// Register data interface
export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  currency: string;
  country: string;
}

// Define the overall shape of your Redux store state
export interface AppState {
  auth: AuthState;
  errors: ErrorState;
  users: UserState;
  // Add other slices of state as needed
}

// Action type interfaces
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: UserData;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: UserData;
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
}

interface GetErrorsAction {
  type: typeof GET_ERRORS;
  payload: ErrorData;
}

interface ClearErrorsAction {
  type: typeof CLEAR_ERRORS;
}

interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  payload: UserData[];
}

interface GetUsersFailAction {
  type: typeof GET_USERS_FAIL;
  payload: string;
}

// Exporting action types
export type AuthActionTypes =
  | LoginSuccessAction
  | RegisterSuccessAction
  | LoginFailAction
  | RegisterFailAction
  | LogoutSuccessAction
  | UserLoadedAction
  | AuthErrorAction;

export type ErrorActionTypes = GetErrorsAction | ClearErrorsAction;

export type UserActionTypes = GetUsersSuccessAction | GetUsersFailAction;