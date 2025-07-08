import { createRouter, createWebHistory } from 'vue-router'
import RegistrationVueView from '@/views/RegistrationVueView.vue'
import { useUserStore } from '@/stores/user.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registration',
      component: RegistrationVueView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (userStore.user.id && from.path === '/') {
          next({ name: 'home' })
          return
        }
        next()
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (userStore.user.id) {
          next()
        }

        next({ name: 'registration' })
      },
    },
  ],
})

export default router
