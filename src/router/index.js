import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/events',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/EventInfo/:id',
    name: 'EventInfo',
    component: () => import('../views/EventInfo.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]


const router = new VueRouter({
  routes 
})

export default router