import { afterEach, beforeEach, describe, vi, it, expect } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import FooterComponent from '@/components/Footer/FooterComponent.vue'

describe('Testing FooterComponent', () => {
  let wrapper: VueWrapper<InstanceType<typeof FooterComponent | any>>

  beforeEach(() => {
    wrapper = shallowMount(FooterComponent, {
      props: {
        leftButtonLabel: 'Left Button',
        isLeftButtonDisabled: false,
        rightButtonLabel: 'Right Button',
        center: true,
        space: '12',
      },
      emits: {
        leftButtonAction: () => vi.fn(),
        rightButtonAction: () => vi.fn(),
      },
      global: {
        stubs: {
          VContainer: {
            template: '<div class="v-container"><slot /></div>',
          },
          VBtn: {
            template: '<button class="v-btn"><slot /></button>',
          },
        },
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('DOM tests', () => {
    it('should render component', () => {
      expect(wrapper.exists()).toBeDefined()
    })

    it('renders left button with label "Left Button"', () => {
      const leftButton = wrapper.find('#left-btn')

      expect(leftButton.exists()).toBeTruthy()
      expect(leftButton.text()).toEqual('Left Button')
    })

    it('renders right button with label "Right Button"', () => {
      const rightBtn = wrapper.find('#right-btn')
      expect(rightBtn.exists()).toBeTruthy()
      expect(rightBtn.text()).toEqual('Right Button')
    })
  })

  describe('Functional tests', () => {
    it('right button emits rightButtonAction while being clicked', async () => {
      expect(wrapper.emitted('rightButtonAction')).toBeFalsy()
      const rightBtn = wrapper.find('#right-btn')
      await rightBtn.trigger('click')
      expect(wrapper.emitted('rightButtonAction')).toBeTruthy()
    })
    it('left button emits leftButtonAction while being clicked', async () => {
      expect(wrapper.emitted('leftButtonAction')).toBeFalsy()
      const leftBtn = wrapper.find('#left-btn')
      await leftBtn.trigger('click')
      expect(wrapper.emitted('leftButtonAction')).toBeTruthy()
    })
    it('returns class including center', () => {
      const classes = wrapper.vm.classes
      expect(classes).toContain('center')
    })
    it("returns class including 'gap-12'", () => {
      const classes = wrapper.vm.classes
      expect(classes).toContain('gap-12')
    })
  })
})
