import React from "react";
import Register from "./components/LoginComponent/Register";
import HomePage from "./components/HomePageComponents/HomePage";
import Login from "./components/LoginComponent/Login";
import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={<HomePage />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;