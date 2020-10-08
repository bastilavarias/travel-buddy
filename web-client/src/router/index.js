import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home-page",
    component: () => import("@/pages/Home"),
  },
  {
    path: "/sign-in",
    name: "sign-in-page",
    component: () => import("@/pages/SignIn"),
  },
  {
    path: "/signup",
    name: "signup-page",
    component: () => import("@/pages/Signup"),
  },
  {
    path: "/feed",
    component: () => import("@/layouts/Main"),
    children: [
      {
        path: "",
        name: "feed-page",
        component: () => import("@/pages/Feed"),
      },
    ],
  },
  {
    path: "/itinerary-post-details",
    component: () => import("@/layouts/Main"),
    children: [
      {
        path: "",
        name: "itinerary-post-details-page",
        component: () => import("@/pages/itinerary/PostDetails"),
      },
    ],
  },
  {
    path: "/itinerary-checkout",
    component: () => import("@/layouts/Main"),
    children: [
      {
        path: "",
        name: "itinerary-checkout-page",
        component: () => import("@/pages/itinerary/Checkout"),
      },
    ],
  },
  {
    path: "/administrator",
    component: () => import("@/layouts/Administrator"),
    children: [
      {
        path: "itinerary-management",
        component: () => import("@/layouts/Sub"),
        children: [
          {
            path: "",
            name: "itinerary-management-page/table",
            component: () => import("@/pages/itinerary/management/Table"),
          },
          {
            path: "form",
            name: "itinerary-management-page/form",
            component: () => import("@/pages/itinerary/management/Form"),
          },
        ],
      },
      {
        path: "tour-guide-management",
        component: () => import("@/layouts/Sub"),
        children: [
          {
            path: "",
            name: "tour-guide-management-page/table",
            component: () => import("@/pages/tour-guide-management/Table"),
          },
          {
            path: "record",
            name: "tour-guide-management-page/record",
            component: () => import("@/pages/tour-guide-management/Record"),
          },
        ],
      },
      {
        path: "account-management",
        component: () => import("@/layouts/Sub"),
        children: [
          {
            path: "",
            name: "account-management-page/table",
            component: () => import("@/pages/account-management/Table"),
          },
          {
            path: "form",
            name: "account-management-page/form",
            component: () => import("@/pages/account-management/Form"),
          },
        ],
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
