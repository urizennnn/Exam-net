import { createRouter, createWebHistory } from "vue-router"

import AdminDashboard from "../pages/AdminDashboard.vue"
import AdminLogin from "../pages/AdminLogin.vue"
import ManageUsers from "../pages/ManageUsers.vue"
import Complaints from "../pages/Complaints.vue"

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
      path: "/users",
      name: "admin-users",
      component: ManageUsers,
    },
    {
      path: "/complaints",
      name: "admin-complaints",
      component: Complaints,
    },
  ],
})

export default router

