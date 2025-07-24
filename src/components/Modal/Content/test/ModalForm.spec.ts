import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import ModalForm from '@/components/Modal/Content/ModalForm.vue'

describe('ModalForm', () => {
  let component: VueWrapper<any>

  beforeEach(() => {
    component = shallowMount(ModalForm)
  })

  describe('DOM tests', () => {
    it('should ', () => {
      // Arrange

      // Act

      // Assert
      expect(true).toBe(true)
    })
  })

  describe('Functional tests', () => {
    it('should ', () => {
      // Arrange

      // Act

      // Assert
      expect(true).toBe(true)
    })
  })
})
