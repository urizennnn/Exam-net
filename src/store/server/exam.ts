import { defineStore } from "pinia";
import { BaseState } from "../../utils/types";
import { errorToast } from "../../utils/toast";
import { axiosInstance } from "../../utils/axiosConfig";

interface ExamServerState extends BaseState {}

interface UploadExamPayload {
  examName: string;
  examKey: string;
  access: string;
  file: any;
  lecturer: string;
  format: any;
  settings: any;
}

export const useExamServerStore = defineStore("exam-server", {
  state: (): ExamServerState => ({
    loading: false,
    success: false,
  }),
  actions: {
    async createExam(payload: UploadExamPayload) {
      try {
        const { data } = await axiosInstance.post("/exams", payload);
        console.log(data);
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
    async getExams() {
      try {
        const { data } = await axiosInstance.get("/exams");
        console.log(data);
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
    async getExam(payload: { id: string }) {
      try {
        const { data } = await axiosInstance.get(`/exams/${payload.id}`);
        console.log(data);
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
    async deleteExam(payload: { id: string }) {
      try {
        const { data } = await axiosInstance.delete(`/exams/${payload.id}`);
        console.log(data);
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
  },
});
