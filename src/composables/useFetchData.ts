import { ref } from 'vue'
import axios from 'axios'
import type {
  BackendDataType,
  EventFromBackendType,
  EventType,
  MerchFromBackendType,
  NewsFromBackendType,
} from '@/components/Table/abstract.ts'
import { TransformDataFromBacked } from '@/components/Table/table.service.ts'

type FetchedDataType = {
  events: EventType[]
  allEventsFromBackend: BackendDataType
  errorMsg: string
}

async function fetchMockedData(): Promise<FetchedDataType> {
  const events: EventType[] = []
  const allEventsFromBackend: BackendDataType = {}
  let errorMsg: string = ''

  let res = await axios.get<EventFromBackendType[]>(`${import.meta.env.VITE_APP_API_URL}/events`)
  if (res.status === 200) {
    allEventsFromBackend.events = res.data
    events.push(...TransformDataFromBacked(res.data))
  } else {
    errorMsg = 'Something went wrong'
  }

  let res2 = await axios.get<MerchFromBackendType[]>(`${import.meta.env.VITE_APP_API_URL}/merch`)
  if (res2.status === 200) {
    allEventsFromBackend.merch = res2.data
    events.push(...TransformDataFromBacked(res2.data))
  } else {
    errorMsg = 'Something went wrong'
  }

  let res3 = await axios.get<NewsFromBackendType[]>(`${import.meta.env.VITE_APP_API_URL}/news`)
  if (res3.status === 200) {
    allEventsFromBackend.news = res3.data
    events.push(...TransformDataFromBacked(res3.data))
  } else {
    errorMsg = 'Something went wrong'
  }

  return {
    events,
    allEventsFromBackend,
    errorMsg,
  }
}

function fetchData(): FetchedDataType {
  return {
    allEventsFromBackend: {},
    events: [],
    errorMsg: '',
  }
}

export async function useFetchEvents() {
  const isLoading = ref(true)
  const allEventsFromBackend = ref<BackendDataType>()
  const events = ref<EventType[]>()
  const errors = ref<string>()

  if (import.meta.env.MODE === 'development') {
    const data = await fetchMockedData()
    allEventsFromBackend.value = data.allEventsFromBackend
    events.value = data.events
    errors.value = data.errorMsg
    isLoading.value = false
  } else {
    const data = fetchData()
    allEventsFromBackend.value = data.allEventsFromBackend
    events.value = data.events
    errors.value = data.errorMsg
    isLoading.value = false
  }

  const onRefresh = import.meta.env.MODE === 'development' ? fetchMockedData : fetchData

  return {
    isLoading,
    allEventsFromBackend,
    events,
    errors,
    onRefresh,
  }
}
