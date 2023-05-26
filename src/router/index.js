import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('../views/preview/index.vue'),
    },
  ],
})

export default router
