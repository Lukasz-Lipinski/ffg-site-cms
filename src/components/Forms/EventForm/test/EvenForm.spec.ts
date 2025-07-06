import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import EventForm from '@/components/Forms/EventForm/EventForm.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { ref as mockRef } from 'vue'
import { Field } from 'vee-validate'
import BandsInput from '@/components/BandsInput/BandsInput.vue'
import { VForm } from 'vuetify/components'
import FooterComponent from '@/components/Footer/FooterComponent.vue'

const mockedSelectedItem = mockRef({
  id: '123e4567-e89b-12d3-a456-426614174000',
  type: 'events',
  title: 'Summer Rock Festival',
  date: new Date(),
  user: {
    name: 'John Smith',
    email: 'john.smith@example.com',
  },
})
const mockedAllEvents = mockRef({
  events: [
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
  ],
  merch: [
    {
      id: 'evt-001',
      title: 'Advanced TypeScript Workshop',
      name: 'TypeScript 2024',
      price: 299.99,
      imageUrl: 'https://example.com/images/typescript-workshop.jpg',
      linkToBuy: 'https://example.com/buy/typescript-workshop',
      dateOfInsert: '2024-01-15',
      dateOfUpdate: '2024-01-16',
      addingEventUser: {
        id: 'usr-001',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      productType: 'hat',
      type: 'merch',
    },
    {
      id: 'evt-002',
      title: 'Web Development Conference',
      name: 'WebDev Summit',
      price: 499.99,
      imageUrl: 'https://example.com/images/webdev-conf.jpg',
      linkToBuy: 'https://example.com/buy/webdev-conference',
      dateOfInsert: '2024-01-10',
      addingEventUser: {
        id: 'usr-002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
      productType: 'pants',
      type: 'merch',
    },
    {
      id: 'evt-003',
      title: 'React Best Practices',
      name: 'React Mastery',
      price: 199.99,
      imageUrl: 'https://example.com/images/react-seminar.jpg',
      dateOfInsert: '2024-01-20',
      dateOfUpdate: '2024-01-21',
      addingEventUser: {
        id: 'usr-003',
        name: 'Bob Wilson',
        email: 'bob.wilson@example.com',
      },
      productType: 't-shirt',
      type: 'merch',
    },
  ],
  news: [
    {
      id: 'content-001',
      title: 'Getting Started with TypeScript',
      description:
        'A comprehensive guide to TypeScript fundamentals, including types, interfaces, and advanced features. Learn how to build scalable applications with TypeScript.',
      dateOfInsert: '2024-01-15',
      dateOfUpdate: '2024-01-16',
      contentUrl: 'https://example.com/content/typescript-guide',
      addingEventUser: {
        id: 'usr-001',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      type: 'news',
    },
    {
      id: 'content-002',
      title: 'Modern JavaScript Development',
      description:
        'Explore modern JavaScript features and best practices. This guide covers ES6+ features, async programming, and modern development workflows.',
      dateOfInsert: '2024-01-10',
      contentUrl: 'https://example.com/content/modern-javascript',
      addingEventUser: {
        id: 'usr-002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
      type: 'news',
    },
    {
      id: 'content-003',
      title: 'Advanced React Patterns',
      description:
        'Deep dive into advanced React patterns including hooks, context, and performance optimization techniques for building efficient React applications.',
      dateOfInsert: '2024-01-20',
      dateOfUpdate: '2024-01-21',
      contentUrl: 'https://example.com/content/react-patterns',
      addingEventUser: {
        id: 'usr-003',
        name: 'Bob Wilson',
        email: 'bob.wilson@example.com',
      },
      type: 'news',
    },
    {
      id: 'content-004',
      title: 'Cloud Architecture Fundamentals',
      description:
        'Learn the core concepts of cloud architecture, including scalability, reliability, and best practices for cloud-native applications.',
      dateOfInsert: '2024-01-22',
      contentUrl: 'https://example.com/content/cloud-architecture',
      addingEventUser: {
        id: 'usr-004',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
      },
      type: 'news',
    },
  ],
})

const mockedUseForm = {
  values: mockedAllEvents.value.events[0],
  resetForm: vitest.fn(),
}

vitest.mock('vee-validate', async (importOriginal) => {
  const actual = <any>await importOriginal()
  return {
    ...actual,
    useForm: () => ({
      ...actual.useForm(),
      ...mockedUseForm,
    }),
  }
})

describe('EventForm Component tests', () => {
  let component: VueWrapper<InstanceType<typeof EventForm & any>>

  beforeEach(() => {
    component = shallowMount(EventForm, {
      global: {
        components: {
          BandsInput,
        },
        plugins: [createVuetify({ components, directives })],
        stubs: {
          VForm: {
            template: '<form><slot /></form>',
          },
          FormLayout: false,
          VBtn: {
            template: "<button class='v-btn'><slot /></button>",
          },
          VContainer: {
            template: '<div class="v-container" ><slot /></div>',
          },
          VRow: {
            template: '<div class="v-row"><slot /></div>',
          },
          VCol: {
            template: '<div class="v-col"><slot /></div>',
          },
          VLabel: {
            template: "<label class='v-field-label'><slot /></label>",
          },
          BandsInput: false,
          FooterComponent: false,
          VSlideGroup: {
            template: '<div class="v-slide-group"><slot /></div>',
          },
        },
        provide: {
          selectedItem: mockedSelectedItem,
          allEvents: mockedAllEvents,
        },
      },
    })
  })
  describe('DOM tests', () => {
    afterEach(() => {
      vitest.clearAllMocks()
    })

    it('should be rendered', () => {
      console.log(component.html())
      expect(component.exists()).toBeTruthy()
    })
    it('renders form', () => {
      const form = component.findComponent(VForm)

      expect(form.exists()).toBeTruthy()
      expect((form.element as HTMLFormElement).children.length).greaterThan(0)
    })
    it('renders fulfilled fields with selected item data', () => {
      const fields = component.findAllComponents(Field)
      const bandsInput = component.findComponent(BandsInput)

      expect(fields.length).toBe(8)
      expect(bandsInput.exists()).toBeTruthy()
      expect(bandsInput.vm.initialValues.length).toBe(3)
    })
    it('renders footer with 2 buttons', () => {
      const footer = component.findComponent(FooterComponent)

      expect(footer.exists()).toBeDefined()
      expect(footer.findAll('button').length).toEqual(2)
    })
  })

  describe('Functional tests', () => {
    afterEach(() => {
      vitest.clearAllMocks()
    })
    it('left footer button invokes onSubmit', async () => {
      const spyOnOnSubmit = vitest.spyOn(component.vm, 'onSubmit')

      const footer = component.findComponent(FooterComponent).find('button#left-btn')

      await footer.trigger('click')
      await component.vm.$nextTick()

      expect(spyOnOnSubmit).toHaveBeenCalledOnce()
    })
    it('right footer button invokes onReset', async () => {
      const spyOnOnReset = vitest.spyOn(component.vm, 'onReset')

      const footer = component.findComponent(FooterComponent).find('button#right-btn')

      await footer.trigger('click')
      await component.vm.$nextTick()

      expect(spyOnOnReset).toHaveBeenCalledOnce()
    })
    it('onReset invokes resetForm', async () => {
      component.vm.onReset = vitest.fn().mockImplementation(() => {
        mockedUseForm.resetForm()
      })
      const spyOn = vitest.spyOn(mockedUseForm, 'resetForm')

      component.vm.onReset()
      expect(spyOn).toHaveBeenCalledOnce()
    })
  })
})
