export type NewExamStore = {
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
};

export type ExamStoreState = {
  exams: {
    examName: string;
    examKey: string;
    createdAt: string;
    access: "open" | "closed" | "discoverable" | "scheduled";
  }[];
};

export type BaseState = {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  loading: boolean;
};

export type UploadDocumentPayload = {
  file: any | null;
};

export type UploadDocumentResponse = {
  data: string[] | string;
};

export type TabsType = {
  isActive: boolean;
  label: string;
  value: string;
};

export type Exam = {
  _id?: string;
  access: string;
  createdAt: string;
  endDate: string;
  examKey: string;
  examName: string;
  lecturer: string;
  ongoing: number;
  question: string;
  settings: {
    examType: {
      hidePoints: boolean;
      showResults: boolean;
    };
    general: {
      anonymous: boolean;
      timeLimit: number;
    };
  };
  format: any[];
  invites?: string[];
};

export type FormStepTwo = {
  informationBlock: boolean;
  multipleChoice: boolean;
  simpleAnswer: boolean;
  fillTheGaps: boolean;
  matchAnswer: boolean;
  grid: boolean;
  freeText: boolean;
  attachment: boolean;
};
