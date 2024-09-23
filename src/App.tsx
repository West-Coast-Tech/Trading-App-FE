import React from "react";
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
import { ThemeProvider } from "./components/ThemeContext"; // Import the ThemeProvider
import Settings from "./components/SettingsPages/Settings";

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
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      {" "}
      {/* Wrap with ThemeProvider */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
