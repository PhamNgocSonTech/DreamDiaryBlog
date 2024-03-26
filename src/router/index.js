import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPass from "@/views/ForgotPassword.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Home" } },

  { path: "/blogs", name: "Blogs", component: Blogs, meta: { title: "Blogs" } },

  { path: "/login", name: "Login", component: Login, meta: { title: "Login" } },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" },
  },

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPass,
    meta: { title: "Forgot Password" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Dream Diary Blogs`;
  next();
});

export default router;
