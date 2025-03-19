import { createRouter, createWebHistory } from "vue-router";
import License from "../pages/School/License.vue";
import Mba from "../pages/Exams/Mba.vue";
import ExamFormat from "../pages/NewExam/ExamFormat.vue";
import NewQuestion from "../pages/NewExam/NewQuestion.vue";
import MainLayout from "../layout/MainLayout.vue";
import NewExamLayout from "../layout/NewExamLayout.vue";

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
          component: Mba,
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
          ],
        },
      ],
    },
  ],
});

export default router;
