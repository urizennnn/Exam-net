import { defineStore } from "pinia";
import {
  UploadDocumentPayload,
  ErrorResponse,
  BaseState,
  UploadDocumentResponse,
} from "../../utils/types";
import { AxiosError } from "axios";
import { axiosInstance } from "../../utils/axiosConfig";

interface DocumentStore extends BaseState {
  result: UploadDocumentResponse[];
}

export const useDocumentStore = defineStore("documents", {
  state: (): DocumentStore => ({
    loading: false,
    success: false,
    result: [],
  }),
  actions: {
    async uploadDocument(payload: UploadDocumentPayload) {
      try {
        this.success = false;
        this.loading = true;

        const formData = new FormData();
        formData.append("file", payload.file);

        const { data } = await axiosInstance.post("/api/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const result = data as UploadDocumentResponse[];

        this.success = true;
        this.result = result;
        this.loading = false;
      } catch (error: any) {
        this.loading = false;
        this.success = false;
        if (error instanceof AxiosError) {
          const requestError = error?.response?.data as ErrorResponse;
          this.error = requestError?.message;
        } else {
          this.error = error?.message || error;
        }
      }
    },
  },
});
