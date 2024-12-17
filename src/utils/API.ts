// src/utils/API.ts
import { Axios, AxiosResponse } from "axios";
import {
  RegisterData,
  LoginData,
  UserData,
  OtpData,
  ResetData,
  SymbolData,
  TradingData,
  TradesData,
  AccountsData,
} from "../actions/types";
import apiClient from "../utils/apiClient";
import { useId } from "react";

// Define the API service with TypeScript
export default {
  // API request to register a new user
  register(email: string): Promise<AxiosResponse<OtpData>> {
    return apiClient.post("/auth/register", { email });
  },
  registerWithOtp(
    data: RegisterData,
    otp: OtpData
  ): Promise<AxiosResponse<UserData>> {
    return apiClient.post("/auth/verify-register-otp", { ...data, ...otp });
  },

  // API request to login a user
  login(data: LoginData): Promise<AxiosResponse<OtpData>> {
    return apiClient.post("/auth/login", data);
  },

  // API request to fetch users
  getUsers(token: string): Promise<AxiosResponse<UserData[]>> {
    return apiClient.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //API request to refresh token
  refreshToken(id: string): Promise<AxiosResponse<UserData>> {
    return apiClient.get("/auth/refresh", {
      headers: { Authorization: `Bearer ${id}` },
    });
  },

  verifyOtp(data: OtpData): Promise<AxiosResponse<UserData>> {
    return apiClient.post("/auth/verify-login-otp", data);
  },
  // API request to send OTP for password reset
  sendOtpForPasswordReset(
    email: string
  ): Promise<AxiosResponse<{ otpToken: string }>> {
    return apiClient.post("/auth/send-password-reset-otp", { email });
  },

  // API request to verify OTP for password reset
  verifyPasswordResetOtp(
    data: OtpData
  ): Promise<AxiosResponse<{ id: string; passwordResetToken: string }>> {
    return apiClient.post("/auth/verify-password-reset-otp", data);
  },

  // API request to reset password
  resetPassword(data: ResetData): Promise<AxiosResponse<void>> {
    return apiClient.post("/auth/reset-password", data, {
      headers: {
        Authorization: `Bearer ${data.resetToken}`,
      },
    });
  },

  changePassword(token: string, payload: any): Promise<AxiosResponse<void>> {
    return apiClient.post("/auth/change-password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getSymbols(token: string): Promise<AxiosResponse<SymbolData[]>> {
    return apiClient.get("/symbols", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getTradingDataforSymbol(
    symbol: string
  ): Promise<AxiosResponse<TradingData[]>> {
    return apiClient.post("/tradingData/", { symbol });
  },

  //API for trade module
  addTrade(
    data: TradesData,
    userId: String
  ): Promise<AxiosResponse<TradesData>> {
    return apiClient.post("/new-trade", { ...data, userId });
  },

  getTrades(
    token: String,
    userId: String
  ): Promise<AxiosResponse<TradesData[]>> {
    console.log("Fetching trades ");
    return apiClient.post("/trades", { userId });
  },

  //API for accounts module
  getAccounts(
    token: String,
    userId: String
  ): Promise<AxiosResponse<AccountsData[]>> {
    return apiClient.post(
      "/accounts",
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  // API request to load user data
  loadUser(token: string, userId: string): Promise<AxiosResponse<UserData>> {
    console.log("UserId", userId);
    return apiClient.post(
      "/user",
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  //API to update user data
  updateUser(
    token: string,
    userId: string,
    name: String,
    dateOfBirth: string
  ): Promise<AxiosResponse<UserData>> {
    console.log("name", name);
    return apiClient.post(
      "/update-user",
      { userId, name, dateOfBirth },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  //API to upload documents
  uploadDocuments(
    token: string,
    formData: FormData
  ): Promise<AxiosResponse<{ documents: File[] }>> {
    console.log("Sending document upload request", formData);
    return apiClient.post("/upload-documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Adjust if you use a different auth mechanism
      },
    });
  },

  //API to handle favorite symbols
  addFavoriteSymbol(
    token: string,
    symbolId: string,
    userId: string
  ): Promise<AxiosResponse<string[]>> {
    return apiClient.post(
      "/users/favorite-symbol",
      { symbolId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  //API to handle favorite symbols
  removeFavoriteSymbol(
    token: string,
    symbolId: string,
    userId: string
  ): Promise<AxiosResponse<string[]>> {
    return apiClient.delete(`/users/favorite-symbol/${symbolId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  //API for transactions
  createDeposit(
    userId: string,
    accountNo: string,
    amount: number,
    currency: string,
    sourceCurrency: string
  ): Promise<AxiosResponse> {
    return apiClient.post("/transactions/deposit-wallet", {
      userId,
      accountNo,
      amount,
      currency,
      sourceCurrency,
    });
  },
  createWithdrawalRequest(
    token: string,
    userId: string,
    amount: string,
    currency: string,
    userWalletAddress: string
  ): Promise<AxiosResponse> {
    const data = { userId, amount, currency, userWalletAddress };
    return apiClient.post(
      "/transactions/withdrawal-request",
      {
        data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  getTransactions(token: string, userId: string): Promise<AxiosResponse> {
    return apiClient.post(
      "/transactions",
      {
        userId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  //API to create NowPayment Record
  createNowPaymentRecord(
    userId: string,
    amount: string,
    currency: string,
    paymentId: string
  ): Promise<AxiosResponse> {
    return apiClient.post("/nowpayment/create", {
      userId,
      amount,
      currency,
      paymentId,
    });
  },

  //Get NowPayment Record
  getNowPaymentRecord(
    token: string,
    paymentId: string
  ): Promise<AxiosResponse> {
    return apiClient.post(
      "/nowpayment/record",
      {
        paymentId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  //API to get affiliate link
  getAffiliateLink(userId: string): Promise<AxiosResponse<string>> {
    return apiClient.post("/affiliate/link", { userId });
  },

  //API to update clicks for affiliate
  updateClicksForAffiliate(linkCode: string): Promise<AxiosResponse<void>> {
    return apiClient.post("/affiliate/clicks", { linkCode });
  },
};
