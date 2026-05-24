"use client";
import { useEffect, useState } from "react";
import { ICurrentUser } from "../types/auth.types";

export const useCurrentUser = () => {
  const [user, setUser] = useState<ICurrentUser | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    }
  }, []);

  return user;
};
