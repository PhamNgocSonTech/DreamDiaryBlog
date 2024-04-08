import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Blogs from "@/views/Blogs.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPass from "@/views/ForgotPassword.vue";
import Profile from "@/views/Profile.vue";
import Admin from "@/views/Admin.vue";
import CreatePost from "@/views/CreatePost.vue";
import BlogPreview from "@/views/BlogPreview.vue";
import ViewBlog from "@/views/ViewBlog.vue";
import EditBlog from "@/views/EditBlog.vue";
import NotFound from "../components/error/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "Home" } },

  { path: "/blogs", name: "Blogs", component: Blogs, meta: { title: "Blogs" } },

  { path: "/login", name: "Login", component: Login, meta: { title: "Login" } },

  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: { title: "Create Post" },
  },

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

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { title: "Profile" },
  },

  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { title: "Admin" },
  },

  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: { title: "Blog Preview" },
  },

  {
    path: "/view-blog/:blogId",
    name: "ViewBlog",
    component: ViewBlog,
    meta: { title: "View Blog" },
  },

  {
    path: "/edit-blog/:blogId",
    name: "EditBlog",
    component: EditBlog,
    meta: { title: "Edit Blog Post" },
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
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
