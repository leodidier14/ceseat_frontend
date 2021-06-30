import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";
import { cart_store } from "@/store/index";

Vue.use(VueRouter);

const userModule = getModule(User, cart_store);

function isAuthenticated() {
  if (userModule.token) {
    return true;
  } else {
    return false;
  }
}

function isClient() {
  if (userModule.userId) {
    return true;
  } else {
    return false;
  }
}

function isRestaurant() {
  if (userModule.roleType == "restaurant") {
    return true;
  } else {
    return false;
  }
}

function isDeliveryMan() {
  if (userModule.roleType == "deliveryman") {
    return true;
  } else {
    return false;
  }
}

function isTechnician() {
  if (userModule.roleType == "technician") {
    return true;
  } else {
    return false;
  }
}

function isBusinessMan() {
  if (userModule.roleType == "businessman") {
    return true;
  } else {
    return false;
  }
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "RestaurantsList",
    beforeEnter(to, from, next) {
      if (isClient()) {
        next();
      } else {
        //rajouter redirection
        next();
      }
    },
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
    beforeEnter(to, from, next) {
      if (!isClient()) {
        next();
      } else {
        //rajouter redirection
        next({ name: "RestaurantsList" });
      }
    },
    component: () => import("@/views/ClientRegister.vue"),
  },
  {
    path: "/client-profile",
    name: "ClientProfile",
    beforeEnter(to, from, next) {
      if (isClient()) {
        next();
      } else {
        //rajouter redirection
        next();
      }
    },
    component: () => import("@/views/ClientProfile.vue"),
  },
  {
    path: "/client-orders",
    name: "ClientOrders",
    beforeEnter(to, from, next) {
      if (isClient()) {
        next();
      } else {
        //rajouter redirection
        next();
      }
    },
    component: () => import("@/views/ClientOrders.vue"),
  },
  {
    path: "/technician-components",
    name: "TechnicianComponents",
    beforeEnter(to, from, next) {
      if (isTechnician()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/TechnicianComponents.vue"),
  },
  {
    path: "/technician-connexion-logs",
    name: "TechnicianConnexionLogs",
    beforeEnter(to, from, next) {
      if (isTechnician()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/TechnicianConnexionLogs.vue"),
  },
  {
    path: "/technician-components-logs",
    name: "TechnicianComponentLogs",
    beforeEnter(to, from, next) {
      if (isTechnician()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
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
    beforeEnter(to, from, next) {
      if (!isRestaurant()) {
        next();
      } else {
        router.push({ name: "RestaurantProfile" });
      }
    },
    component: () => import("@/views/RestaurantRegister.vue"),
  },

  {
    path: "/restaurant-profile",
    name: "RestaurantProfile",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/RestaurantProfile.vue"),
  },

  {
    path: "/deliveryman-register",
    name: "DeliveryManRegister",
    beforeEnter(to, from, next) {
      if (!isDeliveryMan()) {
        next();
      } else {
        router.push({ name: "DeliveryManProfile" });
      }
    },
    component: () => import("@/views/DeliveryManRegister.vue"),
  },

  {
    path: "/deliveryman-profile",
    name: "DeliveryManProfile",
    beforeEnter(to, from, next) {
      if (isDeliveryMan()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/DeliveryManProfile.vue"),
  },
  {
    path: "/deliveryman-orders",
    name: "DeliveryManOrders",
    beforeEnter(to, from, next) {
      if (isDeliveryMan()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/DeliveryManOrders.vue"),
  },

  {
    path: "/restaurant-orders",
    name: "RestaurantOrders",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/RestaurantOrders.vue"),
  },
  {
    path: "/restaurant-history",
    name: "RestaurantHistory",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/RestaurantHistory.vue"),
  },
  {
    path: "/restaurant-stats",
    name: "RestaurantStats",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/RestaurantStats.vue"),
  },
  {
    path: "/customer-menu",
    name: "CustomerMenu",
    beforeEnter(to, from, next) {
      if (isClient()) {
        next();
      } else {
        //rajouter redirection
        next();
      }
    },
    component: () => import("../views/CustomerMenu.vue"),
  },

  {
    path: "/restaurant-menu",
    name: "RestaurantMenu",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/RestaurantMenu.vue"),
  },
  {
    path: "/business-orders-monitor",
    name: "BusinessRestaurantList",
    beforeEnter(to, from, next) {
      if (isBusinessMan()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/BusinessRestaurantList.vue"),
  },
  {
    path: "/business-orders-monitor/:restaurantId",
    name: "BusinessOrdersMonitor",
    beforeEnter(to, from, next) {
      if (isBusinessMan()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/BusinessOrdersMonitor.vue"),
  },
  {
    path: "/business-stats",
    name: "BusinessStats",
    beforeEnter(to, from, next) {
      if (isBusinessMan()) {
        next();
      } else {
        next({ name: "RestaurantsList" }); // voir si il est dev
      }
    },
    component: () => import("@/views/BusinessStats.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    !isAuthenticated() &&
    to.name !== "ClientLogin" &&
    to.name !== "ClientRegister" &&
    to.name !== "DeveloperLogin" &&
    to.name !== "DeveloperRegister"
  ) {
    next({ name: "ClientLogin" });
  } else {
    next();
  }
});

export default router;
