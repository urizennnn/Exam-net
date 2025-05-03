import { defineStore } from "pinia";
import {
  UploadDocumentPayload,
  BaseState,
  UploadDocumentResponse,
} from "../../utils/types";
import { axiosInstance } from "../../utils/axiosConfig";
import { successToast, errorToast } from "../../utils/toast";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface DocumentStore extends BaseState {
  result: {
    type: string;
    question: string;
    option: string[];
    answer: string;
  }[];
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

        const { data } = await axiosInstance.post("/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const result = data as UploadDocumentResponse[];

        this.success = true;
        this.result = result;
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
    async generatePdfBlob(htmlContent: string) {
      const container = document.createElement("div");
      container.innerHTML = htmlContent;
      container.style.padding = "20px";
      container.style.backgroundColor = "white";
      container.style.color = "black";
      container.style.width = "210mm";
      container.style.minHeight = "297mm";
      container.style.boxSizing = "border-box";
      container.style.fontFamily = "Arial, sans-serif";
      container.style.fontSize = "12pt";
      container.style.lineHeight = "1.5";
      container.style.margin = "0 auto";

      document.body.appendChild(container);

      const canvas = await html2canvas(container, { scale: 2 });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      document.body.removeChild(container);

      return pdf.output("blob");
    },
    async uploadPdfToCloudinary(pdfBlob) {
      try {
        this.success = false;
        this.loading = true;
        const name = "dt9mahfbl";
        const unsignedPreset = "unsigned_pdf_upload";
        const url = `https://api.cloudinary.com/v1_1/${name}/upload`;

        const formData = new FormData();
        formData.append("file", pdfBlob);
        formData.append("upload_preset", unsignedPreset);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data, data.secure_url);
        return {
          url: data.secure_url,
        };
      } catch (error) {
        console.error("Error uploading PDF:", error);
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
