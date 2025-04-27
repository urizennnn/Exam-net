import { defineStore } from "pinia";
import { BaseState } from "../../utils/types";
import { errorToast, successToast } from "../../utils/toast";
import { axiosInstance } from "../../utils/axiosConfig";

interface ExamServerState extends BaseState {
  exams: UploadExamPayload[];
}

interface UploadExamPayload {
  _id?: string;
  access: string;
  createdAt: string;
  examKey: string;
  examName: string;
  lecturer: string;
  question: string;
  settings: {
    examType: {
      hidePoints: boolean;
      showResults: boolean;
    };
    general: {
      anonymous: boolean;
      timeLimit: number;
    };
  };
  format: any[];
}

export const useExamServerStore = defineStore("exam-server", {
  state: (): ExamServerState => ({
    loading: false,
    success: false,
    exams: [],
  }),
  actions: {
    async createExam(payload: UploadExamPayload) {
      try {
        this.success = false;
        this.loading = true;
        const { data } = await axiosInstance.post("/exams", payload);

        const { message } = data;
        successToast(message);
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
    async getExams() {
      try {
        this.success = false;
        this.loading = true;
        const { data } = await axiosInstance.get("/exams");
        this.exams = data;
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
        this.success = false;
        this.loading = true;
        const { data } = await axiosInstance.delete(`/exams/${payload.id}`);
        
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
    async deleteExams(payload: UploadExamPayload[]) {
      try {
        const { data } = await axiosInstance.delete(
          `/exams/delete/many`,
          payload,
        );
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
