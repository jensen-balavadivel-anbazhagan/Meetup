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
    name: 'Events',
    component: () => import('../views/Events.vue')
  },
  {
    path: '/eventInfo/:id',
    name: 'EventInfo',
    component: () => import('../views/EventInfo.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/newReview/:id',
    name: 'NewReview',
    component: () => import('../views/NewReview.vue')
  }
]


const router = new VueRouter({
  routes 
})

export default router