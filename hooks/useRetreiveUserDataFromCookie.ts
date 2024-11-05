"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface UserData {
  sub: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

const useRetrieveUserDataFromCookie = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      try {
        const decoded: UserData = jwtDecode<UserData>(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  return userData;
};

export default useRetrieveUserDataFromCookie;
