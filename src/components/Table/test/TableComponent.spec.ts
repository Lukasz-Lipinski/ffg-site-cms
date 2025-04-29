import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import TableComponent from '../TableComponent.vue'
import type { EventType } from '../abstract'
import { SetHeaders } from '../table.service'

describe('Testing Table Component', () => {
  let wrapper: VueWrapper

  const mockedData: EventType[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      type: 'gig',
      title: 'test title',
      date: new Date(),
      user: {
        email: 'test@user.com',
        name: 'Test User',
      },
    },
  ]
  beforeEach(() => {
    wrapper = shallowMount(TableComponent, {
      props: {
        data: mockedData,
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
  })
})
