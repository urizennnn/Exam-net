import {
  defineStore,
} from "pinia";
import type {
  ExamStoreState,
} from "../utils/types";

export const useExamStore = defineStore("exams", {
  state: (): ExamStoreState => ({
    exams: [],
  }),
});
