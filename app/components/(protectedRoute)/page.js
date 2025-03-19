"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Middleware({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setIsAuthenticated(true); // Allow rendering components
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication check is complete
  }

  return <>{children}</>; // Render all components if authenticated
}

export default Middleware;

 