import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";
import {
  defineStore,
} from "pinia";

import type {
  BaseState,
  UploadDocumentPayload,
} from "../../utils/types";

import {
  axiosInstance,
} from "../../utils/axiosConfig";
import {
  errorToast,
  successToast,
} from "../../utils/toast";

type DocumentStore = {
  result: {
    type: string;
    question: string;
    options: string[];
    answer: string;
    studentAnswer?: string;
  }[];
} & BaseState;

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const useDocumentStore = defineStore("documents", {
  state: (): DocumentStore => ({
    loading: false,
    success: false,
    result: localStorage.getItem("examPreview")
      ? JSON.parse(localStorage.getItem("examPreview")!)
      : [],
  }),
  actions: {
    async uploadDocument(payload: UploadDocumentPayload, alert: boolean) {
      try {
        this.success = false;
        this.loading = true;
        const formData = new FormData();
        formData.append("file", payload.file);

        const examKey = localStorage.getItem("examKey");
        const url = examKey ? `/process/${examKey}` : "/process";

        const {
          data: initial,
        } = await axiosInstance.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const jobId = initial.jobId;
        if (!jobId) {
          throw new Error("No jobId returned from server");
        }

        while (true) {
          const {
            data: job,
          } = await axiosInstance.get(`/process/job/${jobId}`);
          if (job.state === "completed") {
            this.result = job.result;
            this.success = true;
            if (alert) {
              successToast("File Uploaded");
            }
            break;
          }
          if (job.state === "failed") {
            throw new Error(job.failedReason || "Processing failed");
          }
          await wait(2000);
        }
      }
      catch (error: any) {
        this.success = false;
        const errorMessage
          = error.message || error.response?.data?.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },

    async generatePdfBlob(htmlContent: string): Promise<Blob> {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const temp = document.createElement("div");
      temp.innerHTML = htmlContent;
      const fullText = temp.textContent || "";

      const fontSize = 10;
      const lineHeight = fontSize * 1.2;
      const margin = 15;
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const maxWidth = pageWidth - margin * 2;

      function wrapText(text: string): string[] {
        const words = text.split(/\s+/);
        const lines: string[] = [];
        let line = "";

        for (const word of words) {
          const test = line ? `${line} ${word}` : word;
          const w = font.widthOfTextAtSize(test, fontSize);
          if (w <= maxWidth) {
            line = test;
          }
          else {
            if (line) {
              lines.push(line);
            }
            line = word;
          }
        }

        if (line) {
          lines.push(line);
        }
        return lines;
      }

      const paragraphs = fullText.split(/\n+/);
      const allLines: string[] = [];

      for (const para of paragraphs) {
        allLines.push(...wrapText(para), "");
      }

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

      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], {
        type: "application/pdf",
      });
    },

    async uploadPdfToS3(pdfBlob: Blob) {
      try {
        this.success = false;
        this.loading = true;

        const region = import.meta.env.VITE_S3_REGION;
        const bucket = import.meta.env.VITE_S3_BUCKET_NAME;
        const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY;
        const secretAccessKey = import.meta.env.VITE_AWS_SECRET_KEY;

        const {
          S3Client,
          PutObjectCommand,
        } = await import("@aws-sdk/client-s3");

        const client = new S3Client({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        });

        const key = `uploads/${Date.now()}.pdf`;
        const command = new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: pdfBlob,
          ContentType: "application/pdf",
          ACL: "public-read",
        });
        await client.send(command);

        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        // eslint-disable-next-line object-curly-newline
        return { url };
      }
      catch {
        return null;
      }
      finally {
        this.loading = false;
      }
    },

    async getPdfFromS3(pdfUrl: string): Promise<File> {
      try {
        this.success = false;
        this.loading = true;

        const res = await fetch(pdfUrl);
        if (!res.ok) {
          throw new Error(`Failed to fetch PDF: ${res.status} ${res.statusText}`);
        }

        const blob = await res.blob();
        const rawName = pdfUrl.split("/").pop() || "download.pdf";
        const filename = decodeURIComponent(rawName);

        return new File([blob], filename, {
          type: blob.type,
          lastModified: Date.now(),
        });
      }
      catch (error: any) {
        this.success = false;
        const errorMessage = error.message || "Network Error";
        errorToast(errorMessage);
        throw new Error(errorMessage);
      }
      finally {
        this.loading = false;
      }
    },

    setQuestions(questions: Array<{
      type: string;
      question: string;
      options: string[];
      answer?: string;
    }>) {
      this.result = questions.map(q => ({
        type: q.type,
        question: q.question,
        options: q.options ?? [],
        answer: "",
      }));
      localStorage.setItem("studentQuestions", JSON.stringify(this.result));
    },
  },
});
