import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import FormLayout from '@/components/Forms/FormLayout/FormLayout.vue'

describe('Testing FormLayout Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof FormLayout | any>>

  beforeEach(() => {
    wrapper = shallowMount(FormLayout, {
      global: {
        stubs: {
          VContainer: {
            template: "<div class='v-container'><slot /></div>",
          },
        },
      },
      slots: {
        form: '<form></form>',
        actions: '<div><button>Update</button><button>Delete</button></div>',
      },
    })
  })

  describe('DOM tests', () => {
    it('should render form layout component', () => {
      expect(wrapper.exists()).toBeDefined()
    })

    it('renders #form slot with children', () => {
      const formSlot = wrapper.vm.$slots.form()

      expect(formSlot).toBeTruthy()
      expect(wrapper.find('form').exists()).toBeTruthy()
    })

    it('renders #actions including 2 buttons', () => {
      const btnSlot = wrapper.vm.$slots.actions()

      expect(btnSlot).toBeTruthy()
      expect(wrapper.findAll('button').length).toStrictEqual(2)
    })
  })
})
