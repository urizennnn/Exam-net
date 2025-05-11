import { defineStore } from "pinia";
import {
  UploadDocumentPayload,
  BaseState,
  UploadDocumentResponse,
} from "../../utils/types";
import { axiosInstance } from "../../utils/axiosConfig";
import { successToast, errorToast } from "../../utils/toast";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface DocumentStore extends BaseState {
  result: {
    type: string;
    question: string;
    options: string[];
    answer: string;
    studentAnswer?: string;
  }[];
}

export const useDocumentStore = defineStore("documents", {
  state: (): DocumentStore => ({
    loading: false,
    success: false,
    result: localStorage.getItem("examPreview")
      ? JSON.parse(localStorage.getItem("examPreview"))
      : [],
  }),
  actions: {
    async uploadDocument(payload: UploadDocumentPayload, alert: boolean) {
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
        if (alert) {
          successToast("File Uploaded");
        }
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
    async generatePdfBlob(htmlContent: string): Promise<Blob> {
      // 1) Create PDF + load font
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // 2) Turn HTML into plain text
      const temp = document.createElement("div");
      temp.innerHTML = htmlContent;
      const fullText = temp.innerText || ""; // strips out all tags

      // 3) Layout settings
      const fontSize = 10;
      const lineHeight = fontSize * 1.2;
      const margin = 15;
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const maxWidth = pageWidth - margin * 2;

      // 4) Helper: wrap a single paragraph into lines
      function wrapText(text: string): string[] {
        const words = text.split(/\s+/);
        const lines: string[] = [];
        let line = "";

        for (const word of words) {
          const test = line ? `${line} ${word}` : word;
          const w = font.widthOfTextAtSize(test, fontSize);
          if (w <= maxWidth) {
            line = test;
          } else {
            if (line) lines.push(line);
            line = word;
          }
        }
        if (line) lines.push(line);
        return lines;
      }

      // 5) Split full text into paragraphs, wrap each
      const paragraphs = fullText.split(/\n+/);
      const allLines: string[] = [];
      for (const para of paragraphs) {
        allLines.push(...wrapText(para), ""); // blank line after each paragraph
      }

      // 6) Draw lines across pages
      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;
      for (const line of allLines) {
        if (y < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      }

      // 7) Persist to Blob
      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], { type: "application/pdf" });
    },
    async uploadPdfToCloudinary(pdfBlob: any) {
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
    async getPdfFromCloudinary(pdfUrl: string): Promise<File> {
      try {
        this.success = false;
        this.loading = true;

        const res = await fetch(pdfUrl, { method: "GET" });
        if (!res.ok) {
          throw new Error(
            `Failed to fetch PDF: ${res.status} ${res.statusText}`,
          );
        }
        const blob = await res.blob();

        // Derive a filename from the URL (or fallback)
        const urlParts = pdfUrl.split("/");
        const rawName = urlParts[urlParts.length - 1] || "download.pdf";
        const filename = decodeURIComponent(rawName);

        // Convert Blob → File
        const file = new File([blob], filename, {
          type: blob.type,
          lastModified: Date.now(),
        });

        this.success = true;
        return file;
      } catch (error: any) {
        this.success = false;
        const errorMessage = error.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      } finally {
        this.loading = false;
      }
    },
  },
});
