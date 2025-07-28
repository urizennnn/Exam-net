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

export type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  invitedAt: string;
  isOnline: boolean;
};

type AdminState = {
  members: Member[];
} & BaseState;

export const useAdminStore = defineStore("admin", {
  state: (): AdminState => ({
    loading: false,
    success: false,
    members: [],
  }),
  actions: {
    async fetchMembers() {
      try {
        this.loading = true;
        // mock response
        const data: Member[] = [
          {
            id: "1",
            name: "Jane Doe",
            email: "jane@example.com",
            role: "member",
            invitedAt: new Date().toISOString(),
            isOnline: true,
          },
          {
            id: "2",
            name: "John Smith",
            email: "john@example.com",
            role: "member",
            invitedAt: new Date().toISOString(),
            isOnline: false,
          },
        ];
        this.members = data;
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
    async inviteMember(payload: { name: string; email: string; role: string }) {
      try {
        this.loading = true;
        const password = Math.random().toString(36).slice(-8);
        const {
          data,
        } = await axiosInstance.post("/admin/invite", {
          ...payload,
          password,
        });
        successToast(data?.message || "Invitation sent");
        this.members.push({
          id: Date.now().toString(),
          name: payload.name,
          email: payload.email,
          role: payload.role,
          invitedAt: new Date().toISOString(),
          isOnline: false,
        });
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
    async deleteMember(id: string) {
      try {
        this.loading = true;
        const {
          data,
        } = await axiosInstance.delete(`/admin/members/${id}`);
        successToast(data?.message || "Member deleted");
        this.members = this.members.filter(m => m.id !== id);
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
    // Additional actions can be added here
  },
});
