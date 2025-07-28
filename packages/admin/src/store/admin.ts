import {
  defineStore,
} from "pinia";

import type {
  BaseState,
} from "@root/utils/types";

import {
  axiosInstance,
} from "@root/utils/axiosConfig";
import {
  errorToast,
  successToast,
} from "@root/utils/toast";

export type User = {
  _id: string;
  name: string;
  email: string;
  online: boolean;
};

type AdminState = {
  users: User[];
} & BaseState;

export const useAdminStore = defineStore("admin", {
  state: (): AdminState => ({
    loading: false,
    success: false,
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        this.loading = true;
        const {
          data,
        } = await axiosInstance.get("/admin/users");
        this.users = data;
        this.success = true;
      }
      catch (error: any) {
        this.success = false;
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },
    async addUser(payload: { name: string; email: string; password: string }) {
      try {
        this.loading = true;
        const {
          data,
        } = await axiosInstance.post("/admin/users", payload);
        successToast(data?.message || "User added");
        this.fetchUsers();
      }
      catch (error: any) {
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },
    async deleteUser(id: string) {
      try {
        this.loading = true;
        const {
          data,
        } = await axiosInstance.delete(`/admin/users/${id}`);
        successToast(data?.message || "User deleted");
        this.fetchUsers();
      }
      catch (error: any) {
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },
    async logoutUser(id: string) {
      try {
        this.loading = true;
        const {
          data,
        } = await axiosInstance.post(`/admin/users/${id}/logout`);
        successToast(data?.message || "User logged out");
        this.fetchUsers();
      }
      catch (error: any) {
        const errorMessage
          = error.response?.data?.message || error.message || "Network Error";
        errorToast(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },
  },
});
