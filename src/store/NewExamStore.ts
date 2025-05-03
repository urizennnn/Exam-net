import { defineStore } from "pinia";
import { NewExamStore } from "../utils/types";
import { uid } from "uid";

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
    formStepTwo: {
      informationBlock: sessionStorage.getItem("informationBlock")
        ? JSON.parse(sessionStorage.getItem("informationBlock"))
        : false,
      multipleChoice: sessionStorage.getItem("multipleChoice")
        ? JSON.parse(sessionStorage.getItem("multipleChoice"))
        : true,
      simpleAnswer: sessionStorage.getItem("simpleAnswer")
        ? JSON.parse(sessionStorage.getItem("simpleAnswer"))
        : true,
      fillTheGaps: sessionStorage.getItem("fillTheGaps")
        ? JSON.parse(sessionStorage.getItem("fillTheGaps"))
        : true,
      matchAnswer: sessionStorage.getItem("matchAnswer")
        ? JSON.parse(sessionStorage.getItem("matchAnswer"))
        : true,
      grid: sessionStorage.getItem("grid")
        ? JSON.parse(sessionStorage.getItem("grid"))
        : true,
      freeText: sessionStorage.getItem("freeText")
        ? JSON.parse(sessionStorage.getItem("freeText"))
        : false,
      attachment: sessionStorage.getItem("attachment")
        ? JSON.parse(sessionStorage.getItem("attachment"))
        : false,
    },
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
      if (this.counter == 2 && this.form.examFormat === "") {
        this.counter -= 1;
        return;
      } else if (this.counter == 2 && this.formStepTwoCounter > 1) {
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
