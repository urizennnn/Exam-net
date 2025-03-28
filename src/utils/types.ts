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
}
