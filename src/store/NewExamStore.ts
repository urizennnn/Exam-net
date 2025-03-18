import { defineStore } from "pinia";
import { NewExamStore } from "../utils/types";

export const useNewExamStore = defineStore("newExams", {
  state: (): NewExamStore => ({
    counter: 1,
    form: {
      examFormat: "",
    },
    formStepTwo: {
      informationBlock: false,
      multipleChoice: true,
      simpleAnswer: true,
      fillTheGaps: true,
      matchAnswer: true,
      grid: true,
      freeText: false,
      attachment: false,
    },
  }),
});
