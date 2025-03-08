import { createRouter, createWebHistory } from "vue-router";
import License from "../pages/License.vue";
import Mba from "../pages/Mba.vue";
import ExamFormat from "../pages/ExamFormat.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "License",
      component: License,
    },
    {
      path: "/exams",
      name: "Exams",
      component: Mba,
    },
    {
      path: "/exam-format",
      name: "ExamFormat",
      component: ExamFormat,
    },
  ],
});

export default router;
