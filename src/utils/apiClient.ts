// src/utils/apiClient.ts
import axios from 'axios';
import isTokenExpired from '../utils/tokenUtils'; // Import the token utility function
import history from '../customHistory'; // For redirection if needed
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../features/authSlice';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Your API base URL
});

// Request interceptor to check token expiry before sending requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      const dispatch = useDispatch<any>();
      dispatch(logoutSuccess());

    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const dispatch = useDispatch<any>();
      dispatch(logoutSuccess()); // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default API;
