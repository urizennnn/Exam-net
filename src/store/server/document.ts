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
  result: string;
}

export const useDocumentStore = defineStore("documents", {
  state: (): DocumentStore => ({
    loading: false,
    success: false,
    result: "",
  }),
  actions: {
    async uploadDocument(payload: UploadDocumentPayload) {
      try {
        this.success = false;
        this.loading = true;
        let output = "";

        const formData = new FormData();
        formData.append("file", payload.file);

        const { data } = await axiosInstance.post("/api/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const result = data as UploadDocumentResponse[];
        result.map((str) => {
          if (typeof str === "string") {
            output += `<p>${str}</p>`;
          } else if (Array.isArray(str)) {
            output += `
              <p>${str[0]}</p>
              <ul>
                ${str[1].map((item) => `<li>${item}</li>`)}
              </ul>
              <p>${str[2]}</p>
            `;
          }
        });

        this.success = true;
        this.result = output;
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
