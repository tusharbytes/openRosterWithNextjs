import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Get token from cookies
const token = Cookies.get("access_token");

// Create an Axios instance
const instance = axios.create({
  baseURL: "https://roaster.shopifystudio.xyz/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Custom Hook to Attach Interceptor
export const useAxiosInterceptor = () => {
const route = useRouter() // Get navigate function

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        // if (response.data?.stepper === "profile") {
          
        //   console.log("Stepper is profile, navigating to /intake");
        //   route.push("/intake"); // Navigate to /intake
        // }
        return response;
      },
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default instance;
