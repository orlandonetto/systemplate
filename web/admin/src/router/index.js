import Vue from "vue";
import VueRouter from "vue-router";
import beforeEach from "./beforeEach";
import perms from "../utils/permissions";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: {requiredAuth: true, permissions: []},
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    component: () => import("../views/main/Dashboard.vue"),
    meta: {requiredAuth: true, permissions: []},
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {preventAuth: true, permissions: []},
    component: () => import("../views/auth/Auth.vue"),
  },
  {
    path: "/users",
    name: "Users",
    meta: {requiredAuth: true, permissions: [perms.user_access]},
    component: () => import("../views/users/Users.vue"),
  },
  {
    path: "/user/:id",
    meta: {requiredAuth: true, permissions: [perms.user_access]},
    component: () => import("../views/user/User.vue"),
    children: [
      {
        path: "",
        name: "User Profile",
        meta: {requiredAuth: true, permissions: [perms.user_access]},
        component: () => import("../views/user/children/UserProfile.vue"),
      },
      {
        path: "manage",
        name: "User Manage",
        meta: {requiredAuth: true, permissions: [perms.user_access, perms.user_edit]},
        component: () => import("../views/user/children/UserManage.vue"),
      },
    ]
  },
  {
    path: "/admins",
    name: "Admins",
    meta: {requiredAuth: true, permissions: [perms.admin_access]},
    component: () => import("../views/admins/Admins.vue"),
  },
  {
    path: "/admin/:id",
    meta: {requiredAuth: true, permissions: [perms.admin_access]},
    component: () => import("../views/admin/Admin.vue"),
    children: [
      {
        path: "",
        name: "Admin Profile",
        meta: {requiredAuth: true, permissions: [perms.admin_access]},
        component: () => import("../views/admin/children/AdminProfile.vue"),
      },
      {
        path: "manage",
        name: "Admin Manage",
        meta: {requiredAuth: true, permissions: [perms.admin_access, perms.admin_edit]},
        component: () => import("../views/admin/children/AdminManage.vue"),
      },
    ]
  },
  {
    path: "/admins",
    name: "Admin",
    meta: {requiredAuth: true, permissions: [perms.admin_access]},
    component: () => import("../views/admins/Admins.vue"),
  },
  {
    path: "*",
    name: "Not Found",
    component: () => import("../views/notFound/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(beforeEach);

export default router;
