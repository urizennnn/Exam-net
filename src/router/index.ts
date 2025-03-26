import { createRouter, createWebHistory } from "vue-router";
import License from "../pages/School/License.vue";
import Exams from "../pages/Exams/Exams.vue";
import ExamFormat from "../pages/NewExam/ExamFormat.vue";
import NewQuestion from "../pages/NewExam/NewQuestion.vue";
import MainLayout from "../layout/MainLayout.vue";
import NewExamLayout from "../layout/NewExamLayout.vue";
import ExamConfig from '../pages/NewExam/ExamConfig.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
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
              path: "/new-question",
              name: "new-question",
              component: NewQuestion,
            },
            {
              path: "/exam-config",
              name: "examConfiguration",
              component: ExamConfig,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
