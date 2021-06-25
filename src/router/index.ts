import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
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
    path: '/dev-register',
    name: 'DevRegister',
    component: () => import('@/views/DevRegister.vue')
  },
  {
    path: '/dev-profile',
    name: 'DevProfile',
    component: () => import('@/views/DevProfile.vue')
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
    path: '/customer-menu',
    name: 'CustomerMenu',
    component: () => import('../views/CustomerMenu.vue')
  },

  {
    path: '/restaurant-menu',
    name: 'RestaurantMenu',
    component: () => import('@/views/RestaurantMenu.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
