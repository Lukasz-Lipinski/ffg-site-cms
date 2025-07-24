import { beforeEach, describe, it, expect, vitest, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import LoginFormComponent from '@/components/LoginForm/LoginFormComponent.vue'
import { createPinia, setActivePinia } from 'pinia'
import { VBtn, VBtnToggle, VForm, VTextField } from 'vuetify/components'
import { createVuetify } from 'vuetify'
import { nextTick } from 'vue'
import { FormOptions } from '@/components/LoginForm/types.ts'
import { useUserStore } from '@/stores/user.ts'
import { useSnackbarStore } from '@/stores/snackbar.ts'

const mockedUserForStore = {
  email: 'test@test.com',
  uid: '123',
}

vitest.mock('@/auth/auth.service.ts', () => {
  return {
    CreateNewAccount: vitest.fn().mockImplementation(() => ({
      user: mockedUserForStore,
    })),
    SignInUser: vitest.fn().mockImplementation(() => ({
      user: mockedUserForStore,
    })),
  }
})

const mockedInputs = ['example@example.com', 'password123']

describe('Testing LoginFormComponent ', () => {
  let component: VueWrapper<any>

  beforeEach(() => {
    setActivePinia(createPinia())
    component = mount(LoginFormComponent, {
      global: {
        plugins: [createVuetify()],
      global: {
        plugins: [createVuetify()],
      },
      props: {
        startValue: 'Login',
        startValue: 'Login',
      },
    })
  })

  describe('Functional tests', () => {
    it('Render correctly', () => {
    it('Render correctly', () => {
      expect(component.exists()).toBe(true)
    })
    it('Submit invokes onVerify method when is clicked', async () => {
      const buttonSubmit = component
        .findAllComponents(VBtn)
        .find(
          (btn) =>
            (btn.element as HTMLButtonElement).getAttribute('type')?.toLowerCase() === 'submit',
        )!
      const spyOnVerify = vitest.spyOn(component.vm, 'onVerify')
    it('Submit invokes onVerify method when is clicked', async () => {
      const buttonSubmit = component
        .findAllComponents(VBtn)
        .find(
          (btn) =>
            (btn.element as HTMLButtonElement).getAttribute('type')?.toLowerCase() === 'submit',
        )!
      const spyOnVerify = vitest.spyOn(component.vm, 'onVerify')

      const inputs = component.findAllComponents(VTextField)
      const inputs = component.findAllComponents(VTextField)

      for (let i = 0; i < inputs.length; i++) {
        await inputs[i].setValue(mockedInputs[i])
        await inputs[i].setValue(mockedInputs[i])
        await inputs[i].vm.$nextTick()
      }

      await nextTick()
      await buttonSubmit.trigger('submit')
      await buttonSubmit.trigger('submit')
      expect(spyOnVerify).toHaveBeenCalledOnce()
    })
    it('Should invokes userStore when onVerify is invoked with register option', async () => {
      component.vm.isRegisterOption = FormOptions.Register

      component.vm.emailInput = mockedInputs[0]
      component.vm.passwordInput = mockedInputs[1]

      const userStore = useUserStore()
      const spyOnUserStore = vitest.spyOn(userStore, 'setUser')
      expect(userStore.user).toStrictEqual({
        email: '',
        id: '',
      })

      await component.vm.onVerify()
      await nextTick()

      expect(spyOnUserStore).toHaveBeenCalledOnce()
      expect(userStore.user).toStrictEqual({
        email: mockedUserForStore.email,
        id: mockedUserForStore.uid,
      })
      expect(component.emitted('isSuccessVerification')![0][0]).toBeTruthy()
    })
    it('Invokes isRegisterEmitter with true value when isRegesiterOption is set on register', async () => {
      component.vm.isRegisterOption = FormOptions.Login
      expect(component.emitted('isRegisterEmitter')).toBeUndefined()

      component.vm.isRegisterOption = FormOptions.Register
      await component.vm.$nextTick()
      expect(component.emitted('isRegisterEmitter')).toBeDefined()
    })
    it('Should invoke snackbarStore.show for catching exception', async () => {
      component.vm.isRegisterOption = FormOptions.Register

      vitest.mock('@/auth/auth.service.ts', () => {
        return {
          CreateNewAccount: vitest.fn().mockImplementation(() => {
            throw new Error('Error')
          }),
        }
      })

      await component.vm.$nextTick()

      const snackbarStore = useSnackbarStore()
      const spyOnSnackbarStore = vitest.spyOn(snackbarStore, 'show')
      component.vm.onVerify()

      expect(spyOnSnackbarStore).toHaveBeenCalledOnce()
    })
  })

  describe('DOM tests', () => {
    it('Login toggle button is selected by default', () => {
    it('Login toggle button is selected by default', () => {
      const buttonToggle = component.findComponent(VBtnToggle).findAllComponents(VBtn)

      expect(buttonToggle.length).toBe(2)
      expect(buttonToggle[0].text()).toBe('Login')
      expect(buttonToggle[0].classes()).toContain('v-btn--active')
      expect(buttonToggle[1].classes()).not.toContain('v-btn--active')
      expect(buttonToggle[0].text()).toBe('Login')
      expect(buttonToggle[0].classes()).toContain('v-btn--active')
      expect(buttonToggle[1].classes()).not.toContain('v-btn--active')
    })
    it('Form is rendered', () => {
    it('Form is rendered', () => {
      const form = component.findComponent(VForm)
      expect(form.exists()).toBe(true)
    })
    it('Inputs are rendered', () => {
      const inputs = component.findAllComponents(VTextField)
    it('Inputs are rendered', () => {
      const inputs = component.findAllComponents(VTextField)

      expect(inputs[0].props('label')).toBe('Email')
      expect(inputs[1].props('label')).toBe('Password')
      expect(inputs[0].props('label')).toBe('Email')
      expect(inputs[1].props('label')).toBe('Password')

      expect(inputs.length).toBe(2)
    })
    it("Input's alert is shown when input is invalid", async () => {
      const input = component.findAllComponents(VTextField)[0]
      let messages = input.find('div#input-v-0-messages .v-messages .v-messages__message')

      expect(messages.exists()).toBeFalsy()

      await input.setValue('invalidemail')
      await input.trigger('blur')
      await input.vm.$nextTick()
      messages = input.find('div#input-v-0-messages .v-messages .v-messages__message')

      expect(messages.exists()).toBeTruthy()
      expect(messages.text()).toBe('Invalid email address')
    })
  })
})
    it("Input's alert is shown when input is invalid", async () => {
      const input = component.findAllComponents(VTextField)[0]
      let messages = input.find('div#input-v-0-messages .v-messages .v-messages__message')

      expect(messages.exists()).toBeFalsy()

      await input.setValue('invalidemail')
      await input.trigger('blur')
      await input.vm.$nextTick()
      messages = input.find('div#input-v-0-messages .v-messages .v-messages__message')

      expect(messages.exists()).toBeTruthy()
      expect(messages.text()).toBe('Invalid email address')
    })
  })
})
