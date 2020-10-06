import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home-page",
    component: () => import("../pages/Home"),
  },
  {
    path: "/sign-in",
    name: "sign-in-page",
    component: () => import("../pages/SignIn"),
  },
  {
    path: "/signup",
    name: "signup-page",
    component: () => import("../pages/Signup"),
  },
  {
    path: "/feed",
    component: () => import("../layouts/Main"),
    children: [
      {
        path: "",
        name: "feed-page",
        component: () => import("../pages/Feed"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
