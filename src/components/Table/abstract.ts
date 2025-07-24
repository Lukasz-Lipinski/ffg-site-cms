export type EventType = {
  id: string
  date: Date
  type: EventTypeType
  title: string
  user: AddingEventUserType
}

export type NewsType = {
  id: string
  title: string
  description: string
  addingEventUser: AddingEventUserType
  contentUrl: string // for images, videos etc.
}

export type MerchType = {
  id: string
  name: string
  price: number
  imageUrl: string
  linkToBuy?: string
  addingEventUser: AddingEventUserType
}

export type AddingEventUserType = {
  name: string
  email: string
}

export type EventTypeType = 'events' | 'news' | 'merch'

//fetched from backend
export type EventFromBackendType = {
  id: string
  type: EventTypeType
  title: string
  bands: string[]
  eventDate: Date
  dateOfInsert: Date
  dateOfUpdate?: Date | string | number
  location: string
  price: number
  start: Date
  linkToEvent: string
  addingEventUser: AddingEventUserType
  linkToBuyTickets: string
}

export type NewsFromBackendType = {
  id: string
  type: EventTypeType
  title: string
  description: string
  dateOfInsert: Date
  dateOfUpdate?: Date
  contentUrl: string
  addingEventUser: AddingEventUserType
}

export type MerchFromBackendType = {
  id: string
  type: EventTypeType
  title: string
  name: string
  price: number
  imageUrl: string
  linkToBuy?: string
  dateOfInsert: Date
  dateOfUpdate?: Date
  addingEventUser: AddingEventUserType
  productType: string
}

export type BackendDataType = {
  news?: NewsFromBackendType[]
  events?: EventFromBackendType[]
  merch?: MerchFromBackendType[]
}

export type RequestObject<T> = Omit<T, 'id'>
