import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";

const routes = [
  { path: "/", component: Home, meta: { title: "Home" } },
  { path: "/blogs", component: Blogs, meta: { title: "Blogs" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | SBlogs`;
  next();
});

export default router;
