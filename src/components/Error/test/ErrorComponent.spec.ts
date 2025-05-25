import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ErrorComponent from '../ErrorComponent.vue'
import { VAlert, VBtn, VContainer } from 'vuetify/components'
import { nextTick } from 'vue'
import { createVuetify } from 'vuetify'

describe('Testing Error Component', () => {
  let wrapper: VueWrapper<any>

  const msg = 'Something went wrong'

  beforeEach(() => {
    wrapper = mount(ErrorComponent, {
      props: {
        msg,
      },
      global: {
        plugins: [createVuetify()],
        components: {
          VAlert,
          VContainer,
          VBtn,
        },
      },
    })
  })

  describe('DOM tests', () => {
    it('rendered correctly', () => {
      expect(wrapper.exists()).toBeTruthy()
    })

    it('should display msg with #text slot', async () => {
      await nextTick()
      const fullText = `${msg}. Please refresh page to reload data or try again later.`
      const textSlot = wrapper.findComponent(VAlert).vm.$slots.text!()[0]

      expect(textSlot.children).toEqual(fullText)
    })
    it('should display title with #title slot', async () => {
      await nextTick()
      const title = wrapper.find('[data-testid="error-title"]')

      expect(title.text()).toEqual('Something went wrong')
    })

    it('should display btn with refresh', async () => {
      await nextTick()

      const btn = wrapper.findComponent(VBtn)

      expect(btn.exists()).toBeDefined()
    })

    describe('Functional tests', () => {
      it('click emits emitter', () => {
        const btn = wrapper.findComponent(VBtn)
        btn.trigger('click')

        expect(wrapper.emitted('onRefresh')).toBeTruthy()
        expect(wrapper.emitted('onRefresh')).toHaveLength(1)
      })
    })
  })
})
