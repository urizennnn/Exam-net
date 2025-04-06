import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://bore.pub:41845",
  headers: {
    "Content-Type": "application/json",
  },
});
