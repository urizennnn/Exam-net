import { defineStore } from "pinia";
import { ExamStoreState } from "../utils/types";

export const useExamStore = defineStore("exams", {
  state: (): ExamStoreState => ({
    exams: localStorage.getItem("exam")
      ? JSON.parse(localStorage.getItem("exams"))
      : [],
  }),
});
