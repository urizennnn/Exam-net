import { defineStore } from "pinia";
import { NewExamStore } from "../utils/types";

export const useNewExamStore = defineStore("newExams", {
  state: (): NewExamStore => ({
    counter: 1,
    form: {
      examFormat: "",
    },
    formStepTwoCounter: 1,
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
  actions: {
    increaseCounter() {
      this.counter += 1;
    },
    decreaseCounter() {
      if (this.formStepTwoCounter > 1) {
        this.formStepTwoCounter -= 1;
        return;
      }
      this.counter -= 1;
    },
    increaseFormStepTwoCounter() {
      this.formStepTwoCounter += 1;
    },
  },
});
