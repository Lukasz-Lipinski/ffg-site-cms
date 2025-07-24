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
<<<<<<< HEAD
        if (userStore.user.id) {
          next({ name: 'dashboard-home' })
          return
        }
=======

        if (userStore.user.id && from.path === '/') {
          next({ name: 'home' })
        }

>>>>>>> c6a6123 (new typo added)
        next()
      },
    },
    {
      path: '/home',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: import('../views/DashboardMainView.vue'),
          beforeEnter: (to, from, next) => {
            const userStore = useUserStore()
            if (userStore.user.id) {
              next()
              return
            }

            next({ name: 'registration' })
          },
        },
        {
          path: '/new/:name',
          name: 'add-item',
          component: () => import('../views/AddNewItemView.vue'),
          beforeEnter: (to, from, next) => {
            const userStore = useUserStore()
            if (userStore.user.id) {
              next()
              return
            }

            next({ name: 'registration' })
          },
        },
      ],
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (userStore.user.id) {
          next()
<<<<<<< HEAD
          return
=======
>>>>>>> c6a6123 (new typo added)
        }

        next({ name: 'registration' })
      },
    },
  ],
})

export default router
