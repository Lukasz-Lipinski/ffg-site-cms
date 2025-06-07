import FormSwitcher from '../FormSwitcher.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import type { EventType } from '@/components/Table/abstract.ts'
import MerchForm from '@/components/Forms/MerchForm/MerchForm.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

const mockEvent: EventType = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  date: new Date('2024-01-01T10:00:00Z'),
  type: 'merch',
  title: 'Test Event',
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
}

describe('FormSwitcher Component', () => {
  let component: VueWrapper<InstanceType<typeof FormSwitcher>>

  beforeEach(() => {
    component = mount(FormSwitcher, {
      props: {
        formName: 'MerchForm',
        event: mockEvent,
      },
      global: {
        plugins: [
          createVuetify({
            components,
          }),
        ],
      },
    })
  })

  describe('DOM tests', () => {
    it('should render', () => {
      expect(component.exists()).toBeTruthy()
    })

    it('should display MerchForm', async () => {
      await flushPromises()
      const merchFormComponent = component.findComponent(MerchForm)
      expect(merchFormComponent.exists()).toBeTruthy()
      expect(merchFormComponent.get('h2').text()).toEqual('Merch Form')
    })
  })
})
