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
  examId: string;
}

export interface ExamStoreState {
  exams: {
    examName: string;
    examKey: string;
    createdAt: string;
    access: "open" | "closed" | "discoverable" | "scheduled";
  }[];
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

export interface TabsType {
  isActive: boolean;
  label: string;
  value: string;
}
