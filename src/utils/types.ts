export interface NewExamStore {
  counter: number;
  form: {
    examFormat: string;
  };
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
}
