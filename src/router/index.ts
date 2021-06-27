import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'RestaurantsList',
    component: () => import('@/views/RestaurantsList.vue')
  },
  {
    path: '/client-login',
    name: 'ClientLogin',
    component: () => import('@/views/ClientLogin.vue')
  },
  {
    path: '/developer-login',
    name: 'DeveloperLogin',
    component: () => import('@/views/DeveloperLogin.vue')
  },
  {
    path: '/client-register',
    name: 'ClientRegister',
    component: () => import('@/views/ClientRegister.vue')
  },
  {
    path: '/client-profile',
    name: 'ClientProfile',
    component: () => import('@/views/ClientProfile.vue')
  },
  {
    path: '/client-orders',
    name: 'ClientOrders',
    component: () => import('@/views/ClientOrders.vue')
  },
  {
    path: '/technician-components',
    name: 'TechnicianComponents',
    component: () => import('@/views/TechnicianComponents.vue')
  },
  {
    path: '/technician-connexion-logs',
    name: 'TechnicianConnexionLogs',
    component: () => import('@/views/TechnicianConnexionLogs.vue')
  },
  {
    path: '/technician-components-logs',
    name: 'TechnicianComponentLogs',
    component: () => import('@/views/TechnicianComponentLogs.vue')
  },
  {
    path: '/developer-register',
    name: 'DeveloperRegister',
    component: () => import('@/views/DeveloperRegister.vue')

  },
  {
    path: '/developer-profile',
    name: 'DeveloperProfile',
    component: () => import('@/views/DeveloperProfile.vue')
  },
  {
    path: '/developer-components',
    name: 'DeveloperComponents',
    component: () => import('@/views/DeveloperComponents.vue')
  },

  {
    path: '/restaurant-register',
    name: 'RestaurantRegister',
    component: () => import('@/views/RestaurantRegister.vue')
  },

  {
    path: '/restaurant-profile',
    name: 'RestaurantProfile',
    component: () => import('@/views/RestaurantProfile.vue')
  },

  {
    path: '/deliveryman-register',
    name: 'DeliveryManRegister',
    component: () => import('@/views/DeliveryManRegister.vue')
  },

  {
    path: '/deliveryman-profile',
    name: 'DeliveryManProfile',
    component: () => import('@/views/DeliveryManProfile.vue')
  },
  {
    path: '/deliveryman-orders',
    name: 'DeliveryManOrders',

    component: () => import('@/views/DeliveryManOrders.vue')
  },
  {
    path: '/restaurants-list',
    name: 'RestaurantsList',

    component: () => import('@/views/RestaurantsList.vue')
  },

  {
    path: '/restaurant-orders',
    name: 'RestaurantOrders',

    component: () => import('@/views/RestaurantOrders.vue')
  },
  {
    path: '/restaurant-history',
    name: 'RestaurantHistory',

    component: () => import('@/views/RestaurantHistory.vue')
  },
  {
    path: '/restaurant-stats',
    name: 'RestaurantStats',

    component: () => import('@/views/RestaurantStats.vue')
  },
  {
    path: '/customer-menu/:restaurantId',
    name: 'CustomerMenu',
    component: () => import('../views/CustomerMenu.vue')
  },

  {
    path: '/restaurant-menu',
    name: 'RestaurantMenu',
    component: () => import('@/views/RestaurantMenu.vue')
  },
  {
    path: '/business-orders-monitor',
    name: 'BusinessRestaurantList',
    component: () => import('@/views/BusinessRestaurantList.vue')
  },
  {
    path: '/business-orders-monitor/:restaurantId',
    name: 'BusinessOrdersMonitor',
    component: () => import('@/views/BusinessOrdersMonitor.vue')
  },
  {
    path: '/business-stats',
    name: 'BusinessStats',
    component: () => import('@/views/BusinessStats.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
