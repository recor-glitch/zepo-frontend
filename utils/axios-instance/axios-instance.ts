import axios from "axios";
import { TokenStorage } from "../access-token-storage/access-token-storage";

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the API base URL from Vite environment variables
      const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

      // If the base URL is available, set it as the request's base URL
      if (baseURL) {
        config.baseURL = baseURL;
      }

      if (TokenStorage.getAccessToken()) {
        const res = await axios.post(`${baseURL}/validate`, {
          accessToken: TokenStorage.getAccessToken(),
        });

        if (res.status === 200 && res.data.statusCode === 401) {
          console.log("I am here", res.data);
          const result = await axios.post(`${baseURL}/invalidate`, {
            accessToken: TokenStorage.getAccessToken(),
            refreshToken: TokenStorage.getRefreshToken(),
          });

          if (result.status === 200) {
            TokenStorage.setAccessToken(result.data.accessToken);
            TokenStorage.setRefreshToken(result.data.refreshToken);
          }
        }
      }

      // Retrieve the JWT token from your storage (localStorage)
      const token = TokenStorage.getAccessToken();

      // Add the token to the request headers if it exists
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

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
