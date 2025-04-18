export const isFormComplete = (formObject: any) => {
  return Object.values(formObject).some((v) => !v);
};

export function hasTrueValue(obj: any): boolean {
  return Object.values(obj).some((value) => value);
}

export function clearData() {
  sessionStorage.clear();
  localStorage.clear();
}

export function clearNewExamData() {
  sessionStorage.removeItem("counter");
  sessionStorage.removeItem("examFormat");
  sessionStorage.removeItem("formStepTwoCounter");
  sessionStorage.removeItem("informationBlock");
  sessionStorage.removeItem("multipleChoice");
  sessionStorage.removeItem("simpleAnswer");
  sessionStorage.removeItem("fillTheGaps");
  sessionStorage.removeItem("matchAnswer");
  sessionStorage.removeItem("grid");
  sessionStorage.removeItem("freeText");
  sessionStorage.removeItem("attachment");
  localStorage.removeItem("editorContent");
  sessionStorage.removeItem("anonymizeExam");
  sessionStorage.removeItem("setTimeLimit");
  sessionStorage.removeItem("setTime");
  sessionStorage.removeItem("studentSelfResume");
  sessionStorage.removeItem("hidePoints");
  sessionStorage.removeItem("showExamResult");
  sessionStorage.removeItem("examName");
  sessionStorage.removeItem("examId");
}
