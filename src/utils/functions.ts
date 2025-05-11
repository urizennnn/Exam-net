export const isFormComplete = (formObject: any) => {
  return Object.values(formObject).some((v) => !v);
};

export function hasTrueValue(obj: any): boolean {
  return Object.values(obj).some((value) => value);
}

export function clearData() {
  sessionStorage.clear();
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
  sessionStorage.removeItem("editorContent");
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

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const sanitize = (text: string) => text.replace(/\n/g, "");

export function questionFormatTeacher(
  questions: Array<{
    question: string;
    options?: string[];
    answer?: string | null;
    studentAnswer?: string | null;
  }>,
): string {
  return `
    <ol>
      ${questions
        .map((q) => {
          const questionText = escapeHtml(q.question);
          const opts =
            Array.isArray(q.options) && q.options.length
              ? `<ul>
                 ${q.options
                   .map((opt) => `<li>${sanitize(escapeHtml(opt))}</li>`)
                   .join("")}
               </ul>`
              : "";
          const answer = q.answer
            ? `<p><strong>Answer:</strong> ${escapeHtml(q.answer)}</p>`
            : "";
          const studentAnswer = q.studentAnswer
            ? `<p><strong>Student Answer:</strong> ${escapeHtml(q.studentAnswer)}</p>`
            : "";

          return `
            <li>
              <h2 class="question-text">${questionText}</h2>
              ${opts}
              ${answer}
              ${studentAnswer}
            </li>
          `;
        })
        .join("")}
    </ol>
  `.trim();
}
