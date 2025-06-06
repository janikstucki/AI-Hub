// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/Register.vue'
import NewChat from '@/views/NewChat.vue'
import Settings from '../views/Settings.vue'
const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/newchat',
      name: 'newchat',
      component: NewChat
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router