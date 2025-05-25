import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationVueView from '@/views/RegistrationVueView.vue'
import { useUserStore } from '@/stores/user.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registration',
      component: RegistrationVueView,
    },

    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        console.log("🚀 ~ beforeEnter ~ userStore.user: ", userStore.user);
       if (userStore.user.id) {
         next()
       }

       next({name: "registration"})
      }
    },
  ],
})

export default router
