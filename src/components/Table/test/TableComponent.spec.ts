import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import TableComponent from '../TableComponent.vue'
import type { EventType } from '../abstract'
import { SetHeaders } from '../table.service'
import { VContainer, VDataTable, VTable } from 'vuetify/components'
import { createVuetify } from 'vuetify'
import { nextTick } from 'vue'

describe('Testing Table Component', () => {
  let wrapper: VueWrapper<any>

  const mockedData: EventType[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      type: 'events',
      title: 'test title',
      date: new Date(),
      user: {
        email: 'test@user.com',
        name: 'Test User',
      },
    },
    {
      id: '987f6543-e21b-12d3-b456-789014174999',
      type: 'news',
      title: 'new test title',
      date: new Date(),
      user: {
        email: 'newtest@user.com',
        name: 'New Test User',
      },
    },
  ]
  beforeEach(() => {
    wrapper = shallowMount(TableComponent, {
      props: {
        data: mockedData,
        selectedItem: undefined,
      },
      global: {
        plugins: [
          createVuetify({
            components: {
              VTable,
              VDataTable,
              VContainer,
            },
          }),
        ],
      },
    })
  })

  describe('DOM tests', () => {
    it('is rendered', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
  })

  describe('Functional tests', () => {
    it('headers should be created initially', () => {
      const headers = SetHeaders(mockedData[0], ['id'])

      expect(wrapper.vm.headers.length).toEqual(headers.length)

      headers.forEach((header, index) => {
        expect(wrapper.vm.headers[index].title).toStrictEqual(header.title)
      })
    })
    it('should emit selected item', async () => {
      expect(wrapper.emitted('selectedItem')).toBeFalsy()
      wrapper.vm.selectedItem = mockedData[0]

      await nextTick()

      expect(wrapper.emitted('selectedItem')).toBeTruthy()
      expect(wrapper.emitted('selectedItem')![0][0]).toStrictEqual(mockedData[0])
    })
  })
})
