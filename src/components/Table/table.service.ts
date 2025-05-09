import type { EventDetailsBackendType, EventType } from './abstract'
import type { DataTableHeader } from 'vuetify'

export function TransformDataFromBacked(data: EventDetailsBackendType[]): EventType[] {
  return data.map(
    (i) =>
      ({
        id: i.id,
        date: i?.dateOfUpdate ?? i.dateOfInsert,
        user: i.addingEventUser,
        title: i.title,
        type: i.type,
      }) as EventType,
  )
}

export const SetHeaders = (events: EventType, whatAviod: (keyof EventType)[]): DataTableHeader[] =>
  Object.keys(events)
    .filter((k) => !whatAviod.includes(k as keyof EventType))
    .map(
      (key) =>
        ({
          title: key
            .split(/(?=[A-Z])/)
            .join(' ')
            .toUpperCase(),
          key: key,
          sortable: true,
          nowrap: true,
        }) as DataTableHeader,
    )
