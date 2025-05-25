import { beforeEach, describe, it, expect, vitest } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import LoginFormComponent from '@/components/LoginForm/LoginFormComponent.vue'
import { getAuth } from "firebase/auth"
import { firebaseAuth } from '@/auth/auth.config.ts'
import { createPinia, setActivePinia } from 'pinia'
import { VBtn, VBtnToggle, VForm, VTextField } from 'vuetify/components'
import { createVuetify } from 'vuetify'
import { nextTick } from 'vue'

const mockedInputs = [
  "example@example.com",
  "password123",
]

describe('Testing LoginFormComponent ', () => {
  let component: VueWrapper<any>
  const auth = getAuth(firebaseAuth)

  beforeEach(() => {
    setActivePinia(createPinia())
    component = mount(LoginFormComponent, {
      global:{
        plugins: [createVuetify()]
      },
      props: {
        startValue: "Login"
      },
    })
  });

  describe('Functional tests', () => {
    it("render correctly", () => {
      expect(component.exists()).toBe(true)
    })
    it("Submit invokes onVerify method when is clicked", async () => {
      const buttonSubmit = component.findAllComponents(VBtn).find((btn) => (btn.element as HTMLButtonElement).getAttribute("type")?.toLowerCase() === "submit")!
      const spyOnVerify = vitest.spyOn(component.vm, "onVerify")

      const inputs =  component.findAllComponents(VTextField)

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].setValue(mockedInputs[i])
        await inputs[i].vm.$nextTick()
      }

      await nextTick()
      buttonSubmit.trigger("submit")
      expect(spyOnVerify).toHaveBeenCalledOnce()
    })
  });

  describe('DOM tests', () => {
    it("Login toggle button is selected by default", () => {
      const buttonToggle = component.findComponent(VBtnToggle).findAllComponents(VBtn)

      expect(buttonToggle.length).toBe(2)
      expect(buttonToggle[0].text()).toBe("Login")
      expect(buttonToggle[0].classes()).toContain("v-btn--active")
      expect(buttonToggle[1].classes()).not.toContain("v-btn--active")
    })
    it("Form is rendered", () => {
      const form = component.findComponent(VForm)
      expect(form.exists()).toBe(true)
    })
    it("Inputs are rendered", () => {
      const inputs =  component.findAllComponents(VTextField)

      expect(inputs[0].props("label")).toBe("Email")
      expect(inputs[1].props("label")).toBe("Password")

      expect(inputs.length).toBe(2)
    })
  });
});
