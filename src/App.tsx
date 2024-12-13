import React, { useEffect } from "react";
import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePageComponents/HomePage";
import Login from "./components/LoginComponent/Login";
import Register from "./components/LoginComponent/Register";
import ForgotPassword from "./components/LoginComponent/ForgotPassword";
import ResetPassword from "./components/LoginComponent/ResetPassword";
import LiveDataChart from "./components/AmChart/LiveDataChart";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeContext";
import Settings from "./components/SettingsPages/Settings";
import Deposit from "./components/SettingsPages/Deposit";
import Withdrawal from "./components/SettingsPages/Withdrawal";
// import Transactions from "./components/SettingsPages/Transactions";
import AccountSettings from "./components/SettingsPages/AccountSettings";
import TradesTable from "./components/SettingsPages/TradesTable";
import DepositForm from "./components/SettingsPages/DepositForm";
import { AppState } from "./actions/types";
import { useSelector } from "react-redux";
import { ConfirmPayment } from "./components/SettingsPages/ConfirmPayment";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Routes without layout */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="live" element={<LiveDataChart />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="deposit" element={<DepositForm />} />

          <Route path="settings" element={<Settings />}>
            <Route path="account" element={<AccountSettings />} />
            <Route path="deposit" element={<Deposit />} />
            <Route
              path="deposit/confirm/:paymentId"
              element={<ConfirmPayment />}
            />
            <Route path="deposit/:coin" element={<DepositForm />} />
            <Route path="withdrawal" element={<Withdrawal />} />
            <Route path="tradeHistory" element={<TradesTable />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
