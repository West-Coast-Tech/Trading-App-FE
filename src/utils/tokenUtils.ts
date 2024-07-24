// src/utils/tokenUtils.ts

import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

  const isTokenExpired = (token: string | null): boolean => {
    console.log("this is isTOkenExpied")
  if (!token) {
    console.log("token has expired")
    localStorage.removeItem('token')
    return true;
    }
  
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    const expired= decodedToken.exp < currentTime
    if(expired) {
        localStorage.removeItem('token')
    }
    return expired;
  } catch (e) {
    console.log("token has expired")
    localStorage.removeItem('token')
    return true;
  }
};

export default isTokenExpired