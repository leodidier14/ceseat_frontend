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
    path: '/client-orders',
    name: 'ClientOrders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/ClientOrders.vue')
  },
  {
    path: '/developer-register',
    name: 'DeveloperRegister',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DeveloperRegister.vue')
   
  },

  {
    path: '/developer-profile',
    name: 'DeveloperProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DeveloperProfile.vue')
  },
  {
    path: '/developer-npm',
    name: 'DevelopperNpm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DeveloperNpm.vue')
  },
  {
    path: '/developer-microservices',
    name: 'DevelopperMicroservices',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DeveloperMicroservices.vue')
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
