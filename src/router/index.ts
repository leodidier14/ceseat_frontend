import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
  },
  {
    path: '/client-register',
    name: 'ClientRegister',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/ClientRegister.vue')
  },
  {
    path: '/client-profile',
    name: 'ClientProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/ClientProfile.vue')
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
    path: '/technician-components',
    name: 'TechnicianComponents',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/TechnicianComponents.vue')
  },
  {
    path: '/technician-connexion-logs',
    name: 'TechnicianConnexionLogs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/TechnicianConnexionLogs.vue')
  },
  {
    path: '/technician-components-logs',
    name: 'TechnicianComponentLogs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/TechnicianComponentLogs.vue')
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/RestaurantRegister.vue')
  },

  {
    path: '/restaurant-profile',
    name: 'RestaurantProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/RestaurantProfile.vue')
  },

  {
    path: '/deliveryman-register',
    name: 'DeliveryManRegister',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DeliveryManRegister.vue')
  },

  {
    path: '/deliveryman-profile',
    name: 'DeliveryManProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DeliveryManProfile.vue')
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
    path: '/article-choice',
    name: 'Article-Choice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleChoice.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
