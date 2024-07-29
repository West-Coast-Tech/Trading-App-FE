// src/utils/API.ts
import {  AxiosResponse } from "axios";
import { RegisterData, LoginData, UserData,OtpData } from "../actions/types";
import apiClient from "../utils/apiClient";

// Define the API service with TypeScript
export default {
    // API request to register a new user
    register(data: RegisterData): Promise<AxiosResponse<UserData>> {
        return apiClient.post("/auth/register", data);
    },

    // API request to login a user
    login(data: LoginData): Promise<AxiosResponse<OtpData>> {
        return apiClient.post("/auth/login", data); 
    },

    // API request to fetch users
    getUsers(token: string): Promise<AxiosResponse<UserData[]>> {
        console.log("token in getusers",token)
        return apiClient.get("/users", { headers: { Authorization: `Bearer ${token}` } });
    },

    //API request to refresh token
    refreshToken(id:string): Promise<AxiosResponse<UserData>> {        
        return apiClient.get("/auth/refresh",{headers:{Authorization: `Bearer ${id}`}});
    },

    verifyOtp(data:OtpData): Promise<AxiosResponse<UserData>> {
        return apiClient.post("/auth/verifyOtp", data); 

    },
    // API request to load user data
    loadUser(): Promise<AxiosResponse<UserData>> {
        return apiClient.get("/user");
    }
};
