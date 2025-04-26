import { defineStore } from "pinia";
import {
  UploadDocumentPayload,
  BaseState,
  UploadDocumentResponse,
} from "../../utils/types";
import { axiosInstance } from "../../utils/axiosConfig";
import { successToast, errorToast } from "../../utils/toast";

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

        result.forEach((chunk) => {
          if (typeof chunk === "string") {
            const cleanedStr = chunk
              .replace(/,\s*\n/g, "\n")
              .replace(/,\s*$/, "")
              .replace(/\n,\s*/g, "\n")
              .trim();
            output += `<p>${cleanedStr}</p>`;
          } else if (Array.isArray(chunk)) {
            const question = String(chunk[0] || "")
              .replace(/,\s*\n/g, "\n")
              .replace(/,\s*$/, "")
              .replace(/\n,\s*/g, "\n")
              .trim();

            const answerList = Array.isArray(chunk[1])
              ? chunk[1].map((item) =>
                  String(item)
                    .replace(/,\s*\n/g, "\n")
                    .replace(/,\s*$/, "")
                    .replace(/\n,\s*/g, "\n")
                    .trim(),
                )
              : [];

            const answerText = String(chunk[2] || "")
              .replace(/,\s*\n/g, "\n")
              .replace(/,\s*$/, "")
              .replace(/\n,\s*/g, "\n")
              .trim();

            output += `
              <p>${question}</p>
              <ul>
                ${answerList.map((item) => `<li>${item}</li>`).join("")}
              </ul>
              <p>${answerText}</p>
            `;
          }
        });

        this.success = true;
        this.result = output;
        successToast("File Uploaded");
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
