import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import TitleTileComponent from '@/components/Modal/TitleTile/TitleTileComponent.vue'
import { createVuetify } from 'vuetify'

describe('Testing TitleTileComponent', () => {
  let component: VueWrapper<InstanceType<typeof TitleTileComponent & any>>

  beforeEach(() => {
    component = shallowMount(TitleTileComponent, {
      props: {
        formName: 'EventForm',
      },
      global: {
        plugins: [createVuetify()],
        stubs: {
          VCardTitle: {
            template: '<div class="v-card-title"><slot /></div>',
          },
          VBtn: {
            template: '<button class="v-btn"><slot/></button>',
          },
        },
      },
    })
  })

  describe('DOM tests', () => {
    it('should be rendered', async () => {
      await flushPromises()

      expect(component.exists()).toBeDefined()
    })
    it('renders Update Event title on mounting', async () => {
      await flushPromises()
      const title = component.find('div.v-card-title')

      expect(title.exists()).toBeDefined()
      expect(title.text()).toEqual('Update Event')
    })

    it('renders button with icon', () => {
      const closeBtn = component.find('button.v-btn')

      expect(closeBtn.exists()).toBeTruthy()
      expect((closeBtn.element as HTMLButtonElement).getAttribute('icon')).toEqual('mdi-close')
    })
  })

  describe('Functional tests', () => {
    it('changes title when props changed', async () => {
      await component.setProps({
        formName: 'MerchForm',
      })
      await component.vm.$nextTick()

      expect(component.vm.title).toEqual('Update Merch')
    })

    it('invokes emitter when onCloseEmitter invoked', () => {
      const spyOnOnCloseEmitter = vitest.spyOn(component.vm, 'emit')
      const btn = component.find('button.v-btn')

      btn.trigger('click')
      expect(spyOnOnCloseEmitter).toHaveBeenCalledOnce()
    })
  })
})
