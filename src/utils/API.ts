// src/utils/API.ts
import {  AxiosResponse } from "axios";
import { RegisterData, LoginData, UserData,OtpData,ResetData } from "../actions/types";
import apiClient from "../utils/apiClient";

// Define the API service with TypeScript
export default {
    // API request to register a new user
    register(email: string): Promise<AxiosResponse<OtpData>> {
        
        return apiClient.post("/auth/register", {email});
    },
    registerWithOtp(data: RegisterData, otp:OtpData): Promise<AxiosResponse<UserData>> {
        return apiClient.post("/auth/verify-register-otp", { ...data, ...otp });
    },

    // API request to login a user
    login(data: LoginData): Promise<AxiosResponse<OtpData>> {
        return apiClient.post("/auth/login", data); 
    },

    // API request to fetch users
    getUsers(token: string): Promise<AxiosResponse<UserData[]>> {
        
        return apiClient.get("/users", { headers: { Authorization: `Bearer ${token}` } });
    },

    //API request to refresh token
    refreshToken(id:string): Promise<AxiosResponse<UserData>> {        
        return apiClient.get("/auth/refresh",{headers:{Authorization: `Bearer ${id}`}});
    },

    verifyOtp(data:OtpData): Promise<AxiosResponse<UserData>> {
        return apiClient.post("/auth/verify-login-otp", data); 

    },
     // API request to send OTP for password reset
     sendOtpForPasswordReset(email: string): Promise<AxiosResponse<{ otpToken: string }>> {
        return apiClient.post("/auth/send-password-reset-otp", { email });
    },

    // API request to verify OTP for password reset
    verifyPasswordResetOtp(data: OtpData): Promise<AxiosResponse<{id:string, passwordResetToken: string }>> {
        return apiClient.post("/auth/verify-password-reset-otp", data);
    },

    // API request to reset password
    resetPassword(data: ResetData): Promise<AxiosResponse<void>> {
        return apiClient.post("/auth/reset-password", data, {
            headers: {
                Authorization: `Bearer ${data.resetToken}`
            }
        });
    },
    // API request to load user data
    loadUser(): Promise<AxiosResponse<UserData>> {
        return apiClient.get("/user");
    }
};
