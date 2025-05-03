import { defineStore } from "pinia";
import { BaseState } from "../../utils/types";
import router from "../../router";
import { successToast, errorToast } from "../../utils/toast";
import { axiosInstance } from "../../utils/axiosConfig";

interface AuthState extends BaseState {
  access: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    loading: false,
    success: false,
    access: "",
  }),
  actions: {
    async login(payload: LoginPayload) {
      try {
        this.success = false;
        this.loading = true;
        const { data } = await axiosInstance.post("/users/login", payload);
        const { access_token } = data;
        this.access = access_token;
        this.setAccessToken(access_token);
        successToast("Login Successful");
        this.success = true;
      } catch (error: any) {
        this.success = false;
        const errorMessage =
          error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      } finally {
        this.loading = false;
      }
    },
    async register(payload: RegisterPayload) {
      try {
        this.success = false;
        this.loading = true;
        const { data } = await axiosInstance.post("/users/signup", payload);
        const { message } = data;
        this.success = true;
        successToast(message);
      } catch (error: any) {
        this.success = false;
        const errorMessage =
          error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      } finally {
        this.loading = false;
      }
    },

    setAccessToken(token: string) {
      this.clearAccessToken();
      this.access = token;
      this.setToken("access", token);
    },

    clearAccessToken() {
      this.access = null;
      this.clearToken("access");
    },
    setToken(key: string, token: string) {
      localStorage.setItem(key, JSON.stringify(token));
    },
    clearToken(key: string) {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    },
    logout() {
      this.clearAccessToken();
      // successToast("Logout Success");
      router.push({
        name: "login",
      });
    },
  },
  getters: {
    getAuthToken(state) {
      const storageToken = localStorage.getItem("access");
      return storageToken || state.access;
    },
  },
});
