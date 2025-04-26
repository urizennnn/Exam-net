import { defineStore } from "pinia";
import { BaseState } from "../../utils/types";

interface AuthState extends BaseState {}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    loading: false,
    success: false,
  }),
});
