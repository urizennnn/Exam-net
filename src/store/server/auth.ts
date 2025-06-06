import {
  defineStore,
} from "pinia";

import type {
  BaseState,
} from "../../utils/types";

import router from "../../router";
import {
  axiosInstance,
} from "../../utils/axiosConfig";
import {
  errorToast,
  successToast,
} from "../../utils/toast";

type AuthState = {
  access: string;
} & BaseState;

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
} & LoginPayload;

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
        const {
          data,
        } = await axiosInstance.post("/users/login", payload);
        const {
          access_token,
          name,
        } = data;
        this.access = access_token;
        this.setAccessToken(access_token);
        this.setToken("name", name);
        successToast("Login Successful");
        this.success = true;
      }
      catch (error: any) {
        this.success = false;
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },

    async register(payload: RegisterPayload) {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.post("/users/signup", payload);
        const {
          message,
        } = data;
        this.success = true;
        successToast(message);
      }
      catch (error: any) {
        this.success = false;
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },

    setAccessToken(token: string) {
      this.clearAccessToken();
      this.access = token;
      this.setToken("access", token);
    },

    clearAccessToken() {
      this.access = "";
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

    async logout() {
      try {
        await axiosInstance.post("/logout");
      }
      catch (error: any) {
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
      }
      finally {
        this.clearAccessToken();
        this.clearToken("name");
        router.push({
          name: "login",
        });
      }
    },
  },
  getters: {
    getAuthToken(state) {
      const storageToken = localStorage.getItem("access");
      return storageToken || state.access;
    },
  },
});
