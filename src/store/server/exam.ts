import { defineStore } from "pinia";
import { BaseState, Exam } from "../../utils/types";
import { errorToast, successToast } from "../../utils/toast";
import { axiosInstance } from "../../utils/axiosConfig";

interface ExamServerState extends BaseState {
  exams: Exam[];
  exam: Exam;
}

export const useExamServerStore = defineStore("exam-server", {
  state: (): ExamServerState => ({
    loading: false,
    success: false,
    exams: [],
    exam: null,
  }),
  actions: {
    async createExam(payload: Exam) {
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
        this.success = false;
        this.loading = true;
        const { data } = await axiosInstance.get(`/exams/${payload.id}`);
        this.exam = data;
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
    async deleteExams(payload: Exam[]) {
      try {
        const { data } = await axiosInstance.patch(
          `/exams/delete/many`,
          payload,
        );
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
  },
});
