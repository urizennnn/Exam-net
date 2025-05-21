import {
  defineStore,
} from "pinia";
import {
  uid,
} from "uid";

import type {
  FormStepTwo,
  NewExamStore,
} from "../utils/types";

import {
  formStepTwoDefaults,
} from "../utils/variables";

export const useNewExamStore = defineStore("newExams", {
  state: (): NewExamStore => ({
    counter: sessionStorage.getItem("counter")
      ? JSON.parse(sessionStorage.getItem("counter"))
      : 1,
    form: {
      examFormat: sessionStorage.getItem("examFormat")
        ? sessionStorage.getItem("examFormat")
        : "",
    },
    formStepTwoCounter: sessionStorage.getItem("formStepTwoCounter")
      ? JSON.parse(sessionStorage.getItem("formStepTwoCounter"))
      : 1,
    formStepTwo: Object.fromEntries(Object.entries(formStepTwoDefaults).map(([key, def]) => {
      const raw = sessionStorage.getItem(key);
      return [key, raw !== null
        ? JSON.parse(raw)
        : def];
    })) as FormStepTwo,
    editorContent: sessionStorage.getItem("editorContent")
      ? sessionStorage.getItem("editorContent")
      : "",
    configOptions: {
      anonymizeExam: sessionStorage.getItem("anonymizeExam")
        ? JSON.parse(sessionStorage.getItem("anonymizeExam"))
        : true,
      setTimeLimit: sessionStorage.getItem("setTimeLimit")
        ? JSON.parse(sessionStorage.getItem("setTimeLimit"))
        : true,
      setTime: sessionStorage.getItem("setTime")
        ? JSON.parse(sessionStorage.getItem("setTime"))
        : 60,
      studentSelfResume: sessionStorage.getItem("studentSelfResume")
        ? JSON.parse(sessionStorage.getItem("studentSelfResume"))
        : false,
      hidePoints: sessionStorage.getItem("hidePoints")
        ? JSON.parse(sessionStorage.getItem("hidePoints"))
        : true,
      showExamResult: sessionStorage.getItem("showExamResult")
        ? JSON.parse(sessionStorage.getItem("showExamResult"))
        : true,
    },
    examName: sessionStorage.getItem("examName")
      ? sessionStorage.getItem("examName")
      : "",
    examId: sessionStorage.getItem("examId")
      ? sessionStorage.getItem("examId")
      : "",
  }),
  actions: {
    increaseCounter() {
      this.counter += 1;
    },
    decreaseCounter() {
      if (this.counter === 2 && this.form.examFormat === "") {
        this.counter -= 1;
        return;
      }
      else if (this.counter === 2 && this.formStepTwoCounter > 1) {
        this.formStepTwoCounter -= 1;
        return;
      }
      this.counter -= 1;
    },
    increaseFormStepTwoCounter() {
      this.formStepTwoCounter += 1;
    },
    generateExamKey() {
      this.examId = uid(7);
    },
  },
});
