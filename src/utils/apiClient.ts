// src/utils/apiClient.ts
import axios from 'axios';
import isTokenExpired from '../utils/tokenUtils'; // Import the token utility function
import history from '../customHistory'; // For redirection if needed
import { store } from '../store';
import { refreshToken } from '../actions/authActions';
const API = axios.create({
  baseURL: 'http://localhost:8080', // Your API base URL
});

// Request interceptor to check token expiry before sending requests
API.interceptors.request.use(
  async (config) => {
    
    const token = sessionStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      
      await store.dispatch(refreshToken());
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
      sessionStorage.removeItem('token');
      history.push('/login'); // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default API;
