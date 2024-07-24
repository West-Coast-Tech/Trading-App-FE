// src/utils/API.ts
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RegisterData, LoginData, UserData } from "../actions/types";
import apiClient from "../utils/apiClient";

// Define the API service with TypeScript
export default {
    // API request to register a new user
    register(data: RegisterData): Promise<AxiosResponse<UserData>> {
        return apiClient.post("/auth/register", data);
    },

    // API request to login a user
    login(data: LoginData): Promise<AxiosResponse<UserData>> {
        return apiClient.post("/auth/login", data); 
    },

    // API request to fetch users
    getUsers(_token: string): Promise<AxiosResponse<UserData[]>> {
        return apiClient.get("/users", { headers: { Authorization: `Bearer ${_token}` } });
    },

    // API request to load user data
    loadUser(): Promise<AxiosResponse<UserData>> {
        return apiClient.get("/user");
    }
};
