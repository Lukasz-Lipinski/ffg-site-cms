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
