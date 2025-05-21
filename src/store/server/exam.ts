import {
  defineStore,
} from "pinia";

import type {
  BaseState,
  Exam,
} from "../../utils/types";

import {
  axiosInstance,
} from "../../utils/axiosConfig";
import {
  errorToast,
  successToast,
} from "../../utils/toast";

type ExamServerState = {
  exams: Exam[];
  exam: Exam;
} & BaseState;

type InviteStudentPayload = {
  emails: string[];
};

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
        const {
          data,
        } = await axiosInstance.post("/exams", payload);

        const {
          message,
        } = data;
        successToast(message);
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

    async getExams() {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.get("/exams");
        this.exams = data;
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

    async getExam(payload: { id: string }) {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.get(`/exams/${payload.id}`);
        this.exam = data;
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

    async deleteExam(payload: { id: string }) {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.delete(`/exams/${payload.id}`);

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

    async deleteExams(payload: Exam[]) {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.patch(`/exams/delete/many`, payload);
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

    async inviteStudentToExam(examId: string, payload: InviteStudentPayload) {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.put(`/exams/invite/${examId}`, payload);
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

    async dropInviteStudent(examId: string, email: string) {
      try {
        this.success = false;
        this.loading = true;
        const {
          data,
        } = await axiosInstance.post(`/exams/drop-invite/${encodeURIComponent(email)}/${examId}`);
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

    async inviteStudentInBulk(examId: string, payload: { file: any }) {
      try {
        this.success = false;
        this.loading = true;
        const formData = new FormData();
        formData.append("file", payload.file);
        const {
          data,
        } = await axiosInstance.put(`/exams/invite/${examId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
  },
});
