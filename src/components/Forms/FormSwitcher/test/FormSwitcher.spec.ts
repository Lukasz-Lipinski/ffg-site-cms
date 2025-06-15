import FormSwitcher from '../FormSwitcher.vue'
import { describe, it, expect, beforeEach, vitest } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import type { EventType } from '@/components/Table/abstract.ts'
import MerchForm from '@/components/Forms/MerchForm/MerchForm.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

vitest.mock('../MerchForm/MerchForm.vue', () => {
  return MerchForm
})

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

const allEvents = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    type: 'events',
    title: 'Summer Rock Festival',
    bands: ['The Rockers', 'Metal Band', 'Indie Group'],
    eventDate: '2024-07-15',
    dateOfInsert: '2024-01-10',
    dateOfUpdate: '2024-01-12',
    location: 'Central Park Arena',
    price: 49.99,
    start: '2024-07-15T18:00:00',
    linkToEvent: 'https://example.com/events/summer-rock-festival',
    addingEventUser: {
      name: 'John Smith',
      email: 'john.smith@example.com',
    },
    linkToBuyTickets: 'https://example.com/tickets/summer-rock-festival',
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    type: 'events',
    title: 'Classical Night',
    bands: ['Symphony Orchestra', 'Chamber Ensemble'],
    eventDate: '2024-08-20',
    dateOfInsert: '2024-01-15',
    dateOfUpdate: '2024-01-15',
    location: 'Grand Concert Hall',
    price: 75.0,
    start: '2024-08-20T19:30:00',
    linkToEvent: 'https://example.com/events/classical-night',
    addingEventUser: {
      name: 'Mary Johnson',
      email: 'mary.j@example.com',
    },
    linkToBuyTickets: 'https://example.com/tickets/classical-night',
  },
  {
    id: '323e4567-e89b-12d3-a456-426614174002',
    type: 'events',
    title: 'Jazz in the Park',
    bands: ['Jazz Quartet', 'Blues Band', 'Swing Ensemble', 'Jazz Orchestra'],
    eventDate: '2024-09-05',
    dateOfInsert: '2024-01-20',
    dateOfUpdate: '2024-01-22',
    location: 'City Park',
    price: 35.5,
    start: '2024-09-05T16:00:00',
    linkToEvent: 'https://example.com/events/jazz-in-the-park',
    addingEventUser: {
      name: 'Robert Wilson',
      email: 'r.wilson@example.com',
    },
    linkToBuyTickets: 'https://example.com/tickets/jazz-in-the-park',
  },
  {
    id: '423e4567-e89b-12d3-a456-426614174003',
    type: 'events',
    title: 'Pop Music Night',
    bands: ['Pop Stars', 'Teen Sensation', 'Electronic Duo'],
    eventDate: '2024-10-12',
    dateOfInsert: '2024-02-01',
    dateOfUpdate: '2024-02-01',
    location: 'Stadium Arena',
    price: 89.99,
    start: '2024-10-12T20:00:00',
    linkToEvent: 'https://example.com/events/pop-music-night',
    addingEventUser: {
      name: 'Sarah Brown',
      email: 'sarah.b@example.com',
    },
    linkToBuyTickets: 'https://example.com/tickets/pop-music-night',
  },
]

describe('FormSwitcher Component', () => {
  let component: VueWrapper<InstanceType<any>>

  beforeEach(() => {
    component = mount(FormSwitcher, {
      props: {
        formName: 'MerchForm',
      },
      provide: {
        selectedItem: mockEvent,
        allEvents: allEvents,
      },
      global: {
        plugins: [createVuetify({ components, directives })],
        stubs: {
          VForm: false,
        },
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

    describe('Functional tests', () => {
      it('Should invoke setForm after mounting', async () => {
        await flushPromises()
        const merchComponent = component.findComponent(MerchForm)
        expect(merchComponent.exists()).toBeTruthy()
      })
    })
  })
})
