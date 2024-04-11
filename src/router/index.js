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
// import { authGuard, adminGuard } from "./guards";

import { auth } from "@/firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Home", requiresAuth: false },
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register", requiresAuth: false },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login", requiresAuth: false },
  },

  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: { title: "Blogs", requiresAuth: false },
  },

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPass,
    meta: { title: "Forgot Password", requiresAuth: false },
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { title: "Profile", requiresAuth: true },
  },

  {
    path: "/view-blog/:blogId",
    name: "ViewBlog",
    component: ViewBlog,
    meta: { title: "View Blog", requiresAuth: true },
  },

  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: { title: "Blog Preview", requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/edit-blog/:blogId",
    name: "EditBlog",
    component: EditBlog,
    meta: { title: "Edit Blog Post", requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { title: "Admin", requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: { title: "Create Post", requiresAuth: true, requiresAdmin: true },
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Logged In
    const token = await user.getIdTokenResult();
    const isAdmin = token.claims.admin;

    // Setup routes for user logged in
    router.beforeEach((to, from, next) => {
      // Check routes if require login
      if (to.meta.requiresAuth) {
        //Check user is admin and routes require admin
        if (isAdmin && to.meta.requiresAdmin) {
          next(); // Allow acess
        } else if (to.meta.requiresAdmin) {
          next({ name: "Home" }); //not admin redictect Home Page
        } else {
          next(); //not require admin, allow acess routes
        }
      } else {
        next(); //route not require login, allow access
      }
    });
  } else {
    // If user not login
    router.beforeEach((to, from, next) => {
      //check route not require login
      if (!to.meta.requiresAuth) {
        next(); // allow access
      } else {
        next({ name: "Login" }); // redictect Login Page
      }
    });
  }
});

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     console.log("User On Auth", user);
//     const token = await user.getIdTokenResult();
//     const admin = token.claims.admin;
//     console.log("Admin On Auth", admin);
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   const user = auth.currentUser;
//   let admin = null;

//   if (user) {
//     const token = await user.getIdTokenResult();
//     admin = token.claims.admin;
//   }

//   console.log("Admin: " + admin);
//   console.log("User: " + user);

//   if (to.matched.some((res) => res.meta.requiresAuth)) {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         if (to.matched.some((res) => res.meta.requiresAdmin)) {
//           if (admin) {
//             return next();
//           }
//           return next({ name: "Home" });
//         }
//         return next();
//       } else {
//         return next({ name: "Home" });
//       }
//     });
//     return next();
//   } else {
//     return next();
//   }
// });

// router.beforeEach(authGuard);

// router.beforeEach(async (to, from, next) => {
//   let user = currentUser;
//   let admin = null;
//   console.log("user", currentUser);
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!user) {
//       next({ name: "Login" });
//     } else {
//       if (to.matched.some((record) => record.meta.requiresAdmin)) {
//         try {
//           const token = await user.getIdTokenResult();
//           admin = token.claims.admin;
//           if (admin) {
//             next();
//           } else {
//             next({ name: "Home" });
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           next({ name: "Home" });
//         }
//       } else {
//         next();
//       }
//     }
//   } else {
//     if (user && (to.name === "Login" || to.name === "Admin")) {
//       next({ name: "Home" });
//     } else {
//       next();
//     }
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   let user = auth.currentUser;
//   console.log("user", user);

//   let admin = null;
//   if (!user) {
//     next({ name: "Login" });
//   }
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (user) {
//       if (to.matched.some((record) => record.meta.requiresAdmin)) {
//         let token = await user.getIdTokenResult();
//         admin = token.claims.admin;
//         console.log("admin: " + admin);
//         if (!admin) {
//           next({ name: "Home" });
//         } else {
//           next();
//         }
//       } else {
//         next();
//       }
//     } else {
//       next({ name: "Login" });
//     }
//   } else {
//     next();
//   }
// });

export default router;
