import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";
import Cart from "@/store/cart";
import { cart_store } from "@/store/index";

Vue.use(VueRouter);

const userModule = getModule(User, cart_store);
const cartModule = getModule(Cart, cart_store);

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

function isDev() {
  if (userModule.devId) {
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
    path: "/policies",
    name: "Policies",
    component: () => import("@/views/Policies.vue"),
  },
  /**************************CLIENT*********************************/
  {
    path: "/client-register",
    name: "ClientRegister",
    beforeEnter(to, from, next) {
      if (!isClient() && !isDev()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/ClientRegister.vue"),
  },
  {
    path: "/client-login",
    name: "ClientLogin",
    beforeEnter(to, from, next) {
      if (!isClient() && !isDev()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/ClientLogin.vue"),
  },
  {
    path: "/client-profile",
    name: "ClientProfile",
    beforeEnter(to, from, next) {
      if (isClient() && !isTechnician()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/ClientProfile.vue"),
  },
  {
    path: "/client-orders",
    name: "ClientOrders",
    beforeEnter(to, from, next) {
      if (isClient() && !isTechnician()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/ClientOrders.vue"),
  },
  {
    path: "/",
    name: "RestaurantsList",
    beforeEnter(to, from, next) {
      if (isClient() && !isTechnician()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/RestaurantsList.vue"),
  },
  {
    path: "/customer-menu",
    name: "CustomerMenu",
    beforeEnter(to, from, next) {
      if (isClient() && !isTechnician()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("../views/CustomerMenu.vue"),
  },
  {
    path: "/customer-payment",
    name: "Payment",
    beforeEnter(to, from, next) {
      if (isClient() && !isTechnician() && cartModule.totalPrice > 0) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("../views/Payment.vue"),
  },

  /**************************DELIVERY-MAN*********************************/
  {
    path: "/deliveryman-register",
    name: "DeliveryManRegister",
    beforeEnter(to, from, next) {
      if (!isDeliveryMan() && !isRestaurant()) {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else if (isBusinessMan()) {
          next({ name: "RestaurantsList" });
        } else {
          next();
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/DeliveryManOrders.vue"),
  },

  /**************************RESTAURANT*********************************/
  {
    path: "/restaurant-register",
    name: "RestaurantRegister",
    beforeEnter(to, from, next) {
      if (!isRestaurant() && !isDeliveryMan()) {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else if (isBusinessMan()) {
          next({ name: "RestaurantsList" });
        } else {
          next();
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/RestaurantProfile.vue"),
  },
  {
    path: "/restaurant-menu",
    name: "RestaurantMenu",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/RestaurantMenu.vue"),
  },
  {
    path: "/restaurant-orders",
    name: "RestaurantOrders",
    beforeEnter(to, from, next) {
      if (isRestaurant()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/RestaurantStats.vue"),
  },

  /**************************DEVELOPER*********************************/
  {
    path: "/developer-register",
    name: "DeveloperRegister",
    beforeEnter(to, from, next) {
      if (!isClient() && !isDev()) {
        next();
      } else {
        if (isClient() && !isTechnician()) {
          next({ name: "RestaurantsList" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/DeveloperRegister.vue"),
  },
  {
    path: "/developer-login",
    name: "DeveloperLogin",
    beforeEnter(to, from, next) {
      if (!isClient() && !isDev()) {
        next();
      } else {
        if (isClient() && !isTechnician()) {
          next({ name: "RestaurantsList" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/DeveloperLogin.vue"),
  },
  {
    path: "/developer-profile",
    name: "DeveloperProfile",
    beforeEnter(to, from, next) {
      if (isDev()) {
        next();
      } else {
        if (isClient() && !isTechnician()) {
          next({ name: "RestaurantsList" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/DeveloperProfile.vue"),
  },
  {
    path: "/developer-components",
    name: "DeveloperComponents",
    beforeEnter(to, from, next) {
      if (isDev()) {
        next();
      } else {
        if (isClient() && !isTechnician()) {
          next({ name: "RestaurantsList" });
        } else {
          next({ name: "TechnicianConnexionLogs" });
        }
      }
    },
    component: () => import("@/views/DeveloperComponents.vue"),
  },

  /**************************TECHNICIAN*********************************/
  {
    path: "/technician-components",
    name: "TechnicianComponents",
    beforeEnter(to, from, next) {
      if (isTechnician()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else {
          next({ name: "RestaurantsList" });
        }
      }
    },
    component: () => import("@/views/TechnicianComponentLogs.vue"),
  },

  /**************************BUSINESSMAN*********************************/
  {
    path: "/business-orders-monitor",
    name: "BusinessRestaurantList",
    beforeEnter(to, from, next) {
      if (isBusinessMan()) {
        next();
      } else {
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
        if (isDev()) {
          next({ name: "DeveloperComponents" });
        } else if (isTechnician()) {
          next({ name: "TechnicianConnexionLogs" });
        } else {
          next({ name: "RestaurantsList" });
        }
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
