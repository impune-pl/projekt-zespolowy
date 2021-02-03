import { createRouter, createWebHistory } from '@ionic/vue-router';
import Splash from '../views/Splash.vue'

const routes = [
  {
    path: '/',
    redirect: '/friends'
  },
  {
    path: '/messages',
    redirect: '/friends'
  },
  {
    path: '/messages/:id/:userId',
    component: () => import('@/views/Messages.vue')
  },
  {
    path: '/position/:id/:userId',
    component: () => import('@/views/Position.vue')
  },
  {
    path: '/friends',
    component: () => import('@/views/Friends.vue')
  },
  {
    path: '/unauth/',
    component: Splash,
    children: [
      {
        path: '',
        redirect: '/unauth/login'
      },
      {
        path: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'register',
        component: () => import('@/views/Register.vue')
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
