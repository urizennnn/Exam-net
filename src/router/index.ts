import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layout/MainLayout.vue";
import NewExamLayout from "../layout/NewExamLayout.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import StudentLogin from "../pages/Auth/StudentLogin.vue";
import Exams from "../pages/Exams/Exams.vue";
import MonitoringResults from "../pages/MonitoringResults/MonitoringResults.vue";
import ExamConfig from "../pages/NewExam/ExamConfig.vue";
import ExamFormat from "../pages/NewExam/ExamFormat.vue";
import NewQuestion from "../pages/NewExam/NewQuestion.vue";
import NotFound from "../pages/NotFound.vue";
import Preview from "../pages/Preview/Preview.vue";
import License from "../pages/School/License.vue";
import Student from "../pages/Student/Student.vue";
import StudentSubmission from "../pages/Student/SubmissionNotification.vue";
import Support from "../pages/Auth/Support.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "license",
          name: "license",
          component: License,
        },
        {
          path: "exams",
          name: "exams",
          component: Exams,
        },
        {
          path: "new-exam",
          component: NewExamLayout,
          children: [
            {
              path: "",
              name: "new-exam",
              component: ExamFormat,
            },
            {
              path: "new-question/:id?",
              name: "new-question",
              component: NewQuestion,
            },
            {
              path: "exam-config",
              name: "examConfiguration",
              component: ExamConfig,
            },
          ],
        },
        {
          path: "/monitoring-results/:id?",
          name: "monitoring-results",
          component: MonitoringResults,
        },
        {
          path: "/support",
          name: "support",
          component: Support,
        },
      ],
    },
    {
      path: "/preview/:id?",
      name: "preview",
      component: Preview,
    },
    {
      path: "/student/:id?",
      name: "student",
      component: Student,
    },
    {
      path: "/student/:id?/done",
      name: "student submission",
      component: StudentSubmission,
    },
    {
      path: "/student-login",
      name: "student-login",
      component: StudentLogin,
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: "/:catchAll(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
