import axios from "axios";
import { AccessTokenStorage } from "../access-token-storage/access-token-storage";

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // console.log("axios interceptor");
      // Retrieve the API base URL from Vite environment variables
      const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

      // If the base URL is available, set it as the request's base URL
      if (baseURL) {
        config.baseURL = baseURL;
      }

      // Retrieve the JWT token from your storage (localStorage)
      const token = AccessTokenStorage.getAccessToken();
      console.log({ token });

      // Add the token to the request headers if it exists
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      console.log("axios config ", { config });

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
