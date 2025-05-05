import axios from "axios";
import { useAuthStore } from "../store/server/auth";

export const axiosInstance = axios.create({
  baseURL: "http://bore.pub:31265/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { getAuthToken, access } = useAuthStore();

    const excludedUrls = ["/users/login", "/users/signup"];

    const isExcludedUrl = excludedUrls.some((url) => config.url?.includes(url));

    if (!isExcludedUrl) {
      if (getAuthToken) {
        if (access) {
          config.headers["Authorization"] = `Bearer ${access}`;
        } else {
          config.headers["Authorization"] = `Bearer ${JSON.parse(
            getAuthToken,
          )}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error({ error });
    if (error.response && error.response.status === 401) {
      // reset store
      const { logout } = useAuthStore();
      logout();
    }
    return Promise.reject(error ?? "Unable to reach server, try again later");
  },
);
