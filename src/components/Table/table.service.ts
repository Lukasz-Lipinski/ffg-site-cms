import type {
  EventFromBackendType,
  EventType,
  MerchFromBackendType,
  NewsFromBackendType,
} from './abstract'
import type { DataTableHeader } from 'vuetify'

export function TransformDataFromBacked(
  data: NewsFromBackendType[] | MerchFromBackendType[] | EventFromBackendType[],
): EventType[] {
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

export const SetHeaders = (events: EventType, whatAvoid: (keyof EventType)[]): DataTableHeader[] =>
  Object.keys(events)
    .filter((k) => !whatAvoid.includes(k as keyof EventType))
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
