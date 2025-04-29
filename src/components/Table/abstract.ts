//for display in table components
export type EventType = {
  id: string
  date: Date
  type: 'gig' | 'news'
  title: string
  user: AddingEventUserType
}

export type AddingEventUserType = {
  name: string
  email: string
}

//fetched from backend
export type EventDetailsBackendType = {
  id: string
  type: 'gig' | 'news'
  title: string
  bands: string[]
  eventDate: Date
  dateOfInsert: Date
  dateOfUpdate?: Date
  location: string
  price: number
  start: Date
  linkToEvent: string
  addingEventUser: AddingEventUserType
  linkToBuyTickets: string
}
