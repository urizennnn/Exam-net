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

export function getTrueKeys<T extends Record<string, boolean>>(
  obj: T,
): Array<keyof T> {
  return (Object.keys(obj) as Array<keyof T>).filter((key) => obj[key]);
}

export function formatQuestion(question: any) {
  let output = "";
  question.forEach((chunk) => {
    if (typeof chunk === "string") {
      const cleanedStr = chunk
        .replace(/,\s*\n/g, "\n")
        .replace(/,\s*$/, "")
        .replace(/\n,\s*/g, "\n")
        .trim();
      output += `<p>${cleanedStr}</p>`;
    } else if (Array.isArray(chunk)) {
      const question = String(chunk[0] || "")
        .replace(/,\s*\n/g, "\n")
        .replace(/,\s*$/, "")
        .replace(/\n,\s*/g, "\n")
        .trim();

      const answerList = Array.isArray(chunk[1])
        ? chunk[1].map((item) =>
            String(item)
              .replace(/,\s*\n/g, "\n")
              .replace(/,\s*$/, "")
              .replace(/\n,\s*/g, "\n")
              .trim(),
          )
        : [];

      const answerText = String(chunk[2] || "")
        .replace(/,\s*\n/g, "\n")
        .replace(/,\s*$/, "")
        .replace(/\n,\s*/g, "\n")
        .trim();

      output += `
              <p>${question}</p>
              <ul>
                ${answerList.map((item) => `<li>${item}</li>`).join("")}
              </ul>
              <p>${answerText}</p>
            `;
    }
  });
  return output;
}
