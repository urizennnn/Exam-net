import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://exam-mode-be.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
