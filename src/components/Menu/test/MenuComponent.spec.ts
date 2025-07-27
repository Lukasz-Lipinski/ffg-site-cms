import { ref as mockRef } from 'vue'
import { describe, it, expect, beforeEach, vitest } from 'vitest'
import MenuComponent from '../MenuComponent.vue'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'

const mockedUser = mockRef({
  email: 'test@test.com',
  id: 'id1234',
})

vitest.mock('@/stores/user.ts', () => ({
  useUserStore: vitest.fn(() => ({
    user: mockedUser.value,
    clearUserCred: vitest.fn().mockImplementation(() => {
      mockedUser.value.email = ''
      mockedUser.value.id = ''
    }),
  })),
}))

const mockedRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: {
      template: "<div class='v-container'><slot /></div>",
    },
  },
  {
    path: '/registration',
    name: 'registration',
    component: {
      template: "<div class='v-container'> <h1>Registration View</h1> <slot /></div>",
    },
  },
]

describe('MenuComponent tests', () => {
  let wrapper: VueWrapper<InstanceType<typeof MenuComponent | any>>
  const router = createRouter({
    history: createWebHistory(),
    routes: mockedRoutes,
  })

  beforeEach(() => {
    setActivePinia(createPinia())

    wrapper = shallowMount(MenuComponent, {
      global: {
        plugins: [createVuetify(), router],
        stubs: {
          VBtn: {
            template: "<button class='v-btn'><slot /></button>",
          },
          VAppBar: {
            template: "<div class='v-app-bar'><slot /> <slot name='append' /></div>",
            slots: {
              append: "<button class='v-btn' type='button' @click='onLogout()'>Logout</button>",
            },
          },
          VContainer: {
            template: "<div class='v-container'><slot /></div>",
          },
        },
      },
    })
  })

  describe('DOM tests', () => {
    it('should render menu component', () => {
      expect(wrapper.exists()).toBeDefined()
    })
    it('renders 4 links and Logout button', () => {
      const links = wrapper
        .findAll('button')
        .filter((c) => (c.element as HTMLButtonElement).getAttribute('text') !== 'Logout')

      expect(links.length).toEqual(wrapper.vm.links.length)
    })
    it('renders logout button', () => {
      const logoutButton = wrapper.find("button[type='button']")
      expect(logoutButton.exists()).toBe(true)
      expect(logoutButton.element.getAttribute('text')).toEqual('Logout')
    })
  })

  describe('Functional tests', () => {
    it('logout button cleans up userStore', async () => {
      const userStore = useUserStore()

      expect(userStore.user.email).toBeTruthy()
      expect(userStore.user.id).toBeTruthy()

      const logoutBtn = wrapper.find("button[type='button']")
      await logoutBtn.trigger('click')

      expect(userStore.user.email).toBeFalsy()
      expect(userStore.user.id).toBeFalsy()
    })
    it('logout button change route after clicking', async () => {
      const logoutButton = wrapper.find("button[type='button']")
      expect(window.location.href).not.include('/registration')

      await logoutButton.trigger('click')
      await router.isReady()

      expect(window.location.href).include('/registration')
    })
  })
})
