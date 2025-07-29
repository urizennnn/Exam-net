import {
  createRouter,
  createWebHistory,
} from "vue-router";

import AdminDashboard from "../pages/AdminDashboard.vue";
import AdminLogin from "../pages/AdminLogin.vue";
import Complaints from "../pages/Complaints.vue";
import Members from "../pages/Members.vue";
import Exams from "../pages/Exams.vue";
import Settings from "../pages/Settings.vue";

const router = createRouter({
  history: createWebHistory("/admin/"),
  routes: [
    {
      path: "/",
      name: "admin-login",
      component: AdminLogin,
    },
    {
      path: "/dashboard",
      name: "admin-dashboard",
      component: AdminDashboard,
    },
    {
      path: "/members",
      name: "admin-members",
      component: Members,
    },
    {
      path: "/complaints",
      name: "admin-complaints",
      component: Complaints,
    },
    {
      path: "/exams",
      name: "admin-exams",
      component: Exams,
    },
    {
      path: "/settings",
      name: "admin-settings",
      component: Settings,
    },
  ],
});

export default router;
