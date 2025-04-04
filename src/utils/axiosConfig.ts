import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
