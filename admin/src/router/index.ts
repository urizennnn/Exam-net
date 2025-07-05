import {
  createRouter,
  createWebHistory,
} from "vue-router";

import AdminDashboard from "../pages/AdminDashboard.vue";
import AdminLogin from "../pages/AdminLogin.vue";

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
  ],
});

export default router;
