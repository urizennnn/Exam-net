import axios from "axios";

import {
  useAuthStore,
} from "../store/server/auth";
import {
  errorToast,
} from "./toast";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const {
    getAuthToken,
    access,
  } = useAuthStore();

  const excludedUrls = ["/users/login", "/users/signup"];

  const isExcludedUrl = excludedUrls.some(url => config.url?.includes(url));

  if (!isExcludedUrl) {
    if (getAuthToken) {
      if (access) {
        config.headers.Authorization = `Bearer ${access}`;
      }
      else {
        config.headers.Authorization = `Bearer ${JSON.parse(getAuthToken)}`;
      }
    }
  }

  return config;
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, (error) => {
  console.error({
    error,
  });

  const status = error.response?.status;
  const requestUrl: string = error.config?.url || "";

  if (status === 401) {
    const excluded = ["/users/login", "/users/signup", "/users/logout"];
    const shouldLogout = !excluded.some(url => requestUrl.includes(url));
    if (shouldLogout) {
      const {
        logout,
      } = useAuthStore();
      logout();
    }
  }

  if (status === 429) {
    errorToast("You are making too many requests, wait a minute");
  }

  return Promise.reject(error ?? "Unable to reach server, try again later");
});
