/* eslint-disable */

import { computed, inject, type Ref } from 'vue'
import type { BackendDataType, EventType } from '@/components/Table/abstract'

export function useSetFormData<T>() {
  const selectedItem = inject<Ref<EventType | null>>('selectedItem')
  const allEventsFromBackend = inject<Ref<BackendDataType>>('allEvents')

  const formData = computed(() => {
    if (allEventsFromBackend?.value && selectedItem?.value) {
      const { [selectedItem.value.type]: typed } = allEventsFromBackend.value

      return (typed as any[]).find((el) => el.id === selectedItem.value?.id) as T
    }
    return null
  })

  return {
    formData,
  }
}

const transformToLabel = (field: string): string =>
  field.replace(/[A-Z]/g, (matched) => ` ${matched}`).toUpperCase()

export type LabelAndFieldType = {
  label: string
  field: string
  type: string
  disabled: boolean
}

export function useFieldNames<T>(notAllowedFields: string[]): LabelAndFieldType[] {
  const selectedItem = inject<Ref<EventType | null>>('selectedItem')
  const allEventsFromBackend = inject<Ref<BackendDataType>>('allEvents')

  const fields = computed<LabelAndFieldType[]>(() => {
    const { [selectedItem!.value!.type]: entities } = allEventsFromBackend!.value

    return Object.entries(entities![0])
      .filter((el) => !notAllowedFields.includes(el[0]))
      .map((el) => {
        let type = verifyType(el[1])
        if (el[0] === 'start') {
          type = 'time'
        }

        return {
          field: el[0],
          label: transformToLabel(el[0]),
          type: type,
          disabled: el[0] === 'type' || el[0] === 'addingEventUser',
        }
      })
  })

  return fields.value
}

function verifyType(val: any) {
  switch (typeof val) {
    case 'string':
      return Date.parse(val) ? 'date' : 'string'
    case 'object':
      return Array.isArray(val) ? 'array' : typeof val
    case 'number':
      return 'string'
    default:
      return typeof val
  }
}
