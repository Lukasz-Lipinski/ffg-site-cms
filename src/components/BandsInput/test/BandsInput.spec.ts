import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import BandsInput from '@/components/BandsInput/BandsInput.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VChip, VChipGroup } from 'vuetify/components'

vitest.mock('vee-validate', () => {
  return {
    useField: () => ({
      value: mockedBands,
    }),
  }
})

const mockedBands = ['band test 1', 'band test 2']

describe('Testing BandsInput Component', () => {
  let component: VueWrapper<any>

  beforeEach(() => {
    component = shallowMount(BandsInput, {
      props: {
        initialValues: mockedBands,
        fieldDetails: {
          label: 'bands',
          field: 'Bands',
          type: 'text',
          disabled: false,
        },
      },
      global: {
        stubs: {
          VChipGroup: {
            template: '<div class="v-chip-group"><slot /></div>',
          },
          VChip: {
            template: '<div class="v-chip"><slot /></div>',
          },
        },
        plugins: [
          createVuetify({
            components,
            directives,
          }),
        ],
      },
    })
  })

  describe('DOM test', () => {
    it('should be rendered', () => {
      expect(component.exists()).toBeTruthy()
    })
    it('input should be rendered with unfulfilled area', () => {
      const input = component.find('input').element as HTMLInputElement

      expect(input.value).toBe('')
    })
    it('ChipsGroup should be rendered with 2 chips', async () => {
      await flushPromises()
      const chipsgroup = component.findComponent(VChipGroup)
      const chips = component.findAllComponents(VChip)
      expect(chipsgroup.isVisible()).toBeTruthy()
      expect(chips.length).toBe(2)
    })
  })

  describe('Functional test', () => {
    it('delete band if chip was clicked', async () => {
      await flushPromises()
      component.vm.onDeleteBand(mockedBands[0])
      await component.vm.$nextTick()
      expect(component.vm.bands.size).toEqual(1)
    })
    it('add new band', () => {
      const mockedNewBand = 'new band added'
      component.vm.fieldRef.value = mockedNewBand
      component.vm.onAddBand({
        key: 'enter',
        target: {
          value: mockedNewBand,
        } as HTMLInputElement,
      })
      expect(component.vm.bands.size).toEqual(3)
    })
  })
})
