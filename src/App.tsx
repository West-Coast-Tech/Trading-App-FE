import React from 'react';
import Register from './components/LoginComponent/Register';
import HomePage from './components/HomePageComponents/HomePage';
import Login from './components/LoginComponent/Login';
import ForgotPassword from './components/LoginComponent/ForgotPassword';
import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/LoginComponent/ResetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path= "reset-password" element={<ResetPassword/>} />
      <Route element={<ProtectedRoute />}>
        <Route path="home" element={<HomePage />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default App;
