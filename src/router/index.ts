import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

Vue.use(VueRouter);

function isAuthenticated() {
  if (localStorage.getItem("token")) {
    // router.push({ name: "ClientLogin" });
    return true;
  }
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "RestaurantsList",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantsList.vue"),
  },
  {
    path: "/client-login",
    name: "ClientLogin",
    component: () => import("@/views/ClientLogin.vue"),
  },
  {
    path: "/developer-login",
    name: "DeveloperLogin",
    component: () => import("@/views/DeveloperLogin.vue"),
  },
  {
    path: "/client-register",
    name: "ClientRegister",
    component: () => import("@/views/ClientRegister.vue"),
  },
  {
    path: "/client-profile",
    name: "ClientProfile",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/ClientProfile.vue"),
  },
  {
    path: "/client-orders",
    name: "ClientOrders",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/ClientOrders.vue"),
  },
  {
    path: "/technician-components",
    name: "TechnicianComponents",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/TechnicianComponents.vue"),
  },
  {
    path: "/technician-connexion-logs",
    name: "TechnicianConnexionLogs",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/TechnicianConnexionLogs.vue"),
  },
  {
    path: "/technician-components-logs",
    name: "TechnicianComponentLogs",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/TechnicianComponentLogs.vue"),
  },
  {
    path: "/developer-register",
    name: "DeveloperRegister",
    component: () => import("@/views/DeveloperRegister.vue"),
  },
  {
    path: "/developer-profile",
    name: "DeveloperProfile",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/DeveloperProfile.vue"),
  },
  {
    path: "/developer-components",
    name: "DeveloperComponents",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/DeveloperComponents.vue"),
  },

  {
    path: "/restaurant-register",
    name: "RestaurantRegister",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantRegister.vue"),
  },

  {
    path: "/restaurant-profile",
    name: "RestaurantProfile",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantProfile.vue"),
  },

  {
    path: "/deliveryman-register",
    name: "DeliveryManRegister",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/DeliveryManRegister.vue"),
  },

  {
    path: "/deliveryman-profile",
    name: "DeliveryManProfile",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/DeliveryManProfile.vue"),
  },
  {
    path: "/deliveryman-orders",
    name: "DeliveryManOrders",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/DeliveryManOrders.vue"),
  },

  {
    path: "/restaurant-orders",
    name: "RestaurantOrders",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantOrders.vue"),
  },
  {
    path: "/restaurant-history",
    name: "RestaurantHistory",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantHistory.vue"),
  },
  {
    path: "/restaurant-stats",
    name: "RestaurantStats",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantStats.vue"),
  },
  {
    path: "/customer-menu",
    name: "CustomerMenu",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("../views/CustomerMenu.vue"),
  },

  {
    path: "/restaurant-menu",
    name: "RestaurantMenu",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/RestaurantMenu.vue"),
  },
  {
    path: "/business-orders-monitor",
    name: "BusinessRestaurantList",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/BusinessRestaurantList.vue"),
  },
  {
    path: "/business-orders-monitor/:restaurantId",
    name: "BusinessOrdersMonitor",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/BusinessOrdersMonitor.vue"),
  },
  {
    path: "/business-stats",
    name: "BusinessStats",
    // beforeEnter(to, from, next) {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     router.push({ name: "ClientLogin" });
    //   }
    // },
    component: () => import("@/views/BusinessStats.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
