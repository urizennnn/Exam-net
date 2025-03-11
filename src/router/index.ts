import { createRouter, createWebHistory } from "vue-router";
import License from "../pages/School/License.vue";
import Mba from "../pages/Exams/Mba.vue";
import ExamFormat from "../pages/New-exam/ExamFormat.vue";
import NewQuestion from "../pages/New-exam/NewQuestion.vue";



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
      path: "/new-exam",
      name: "New-exam",
      component: ExamFormat
    },
    {
      path: "/new-question",
      name: "New-question",
      component: NewQuestion,
    },
  
  ],
});

export default router;
