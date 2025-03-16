import { defineStore } from "pinia";
import { NewExamStore } from "../utils/types";

export const useNewExamStore = defineStore("newExams", {
  state: (): NewExamStore => ({
    counter: 1,
    form: {
      examFormat: "",
    },
  }),
});
