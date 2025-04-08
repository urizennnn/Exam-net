import { Bold } from "ckeditor5";

export interface NewExamStore {
  counter: number;
  form: {
    examFormat: string;
  };
  formStepTwoCounter: number;
  formStepTwo: {
    informationBlock: boolean;
    multipleChoice: boolean;
    simpleAnswer: boolean;
    fillTheGaps: boolean;
    matchAnswer: boolean;
    grid: boolean;
    freeText: boolean;
    attachment: boolean;
  };
  editorContent: string;
  configOptions: {
    anonymizeExam: boolean;
    setTimeLimit: boolean;
    setTime: number;
    studentSelfResume: boolean;
    hidePoints: boolean;
    showExamResult: boolean;
  };
  examName: string;
}

export interface BaseState {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  loading: boolean;
}

export interface UploadDocumentPayload {
  file: any | null;
}

export interface UploadDocumentResponse {
  data: string[] | string;
}

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error:
    | {
        response: {
          message: string;
          success: boolean;
        };
        status: number;
        options: any;
        message: string;
        name: string;
      }
    | string;
}
