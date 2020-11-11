import Vue from "vue";
import VueRouter from "vue-router";
import { REFRESH_AUTHENTICATION_SERVICE } from "@/store/types/authentication";
import store from "@/store";

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/itinerary-post-details",
    component: () => import("@/layouts/Main"),
    children: [
      {
        path: ":postID",
        name: "itinerary-post-details-page",
        component: () => import("@/pages/itinerary/PostDetails"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/itinerary-checkout",
    component: () => import("@/layouts/Main"),
    children: [
      {
        path: ":postID",
        name: "itinerary-checkout-page",
        component: () => import("@/pages/itinerary/Checkout"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
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
      {
        path: "transaction-management",
        component: () => import("@/layouts/Sub"),
        children: [
          {
            path: "",
            name: "transaction-management-page/table",
            component: () => import("@/pages/transaction-management/Table"),
          },
          {
            path: "form",
            name: "transaction-management-page/form",
            component: () => import("@/pages/transaction-management/Form"),
          },
        ],
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tour-guide/my",
    component: () => import("@/layouts/TourGuide"),
    children: [
      {
        path: "",
        name: "tour-guide-personal-bookings-page/table",
        component: () => import("@/pages/TourGuidePersonalBookingsTable"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch(REFRESH_AUTHENTICATION_SERVICE);
  const authentication = store.state.authentication;
  const isAuthenticated = authentication.isAuthenticated;
  const isProtectedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  const publicRoutes = ["home-page", "sign-in-page", "signup-page"];
  if (isProtectedRoute && !isAuthenticated)
    return next({ name: "sign-in-page" });
  if (publicRoutes.includes(to.name) && isAuthenticated)
    return next({ name: "feed-page" });
  next();
});

export default router;
