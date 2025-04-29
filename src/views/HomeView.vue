<template>
  <VContainer>
    <VSkeletonLoader v-if="!events.length && isLoading" type="table" />
    <TableComponent v-else-if="events.length && !isLoading" :data="events" />
    <VAlert v-else-if="isError" type="error">{{ isError }}</VAlert>
  </VContainer>
</template>

<script setup lang="ts">
import type { EventDetailsBackendType, EventType } from '@/components/Table/abstract'
import { TransformDataFromBacked } from '@/components/Table/table.service'
import TableComponent from '@/components/Table/TableComponent.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { VAlert, VContainer, VSkeletonLoader } from 'vuetify/components'

const events = ref<EventType[]>([])
const isError = ref<string | null>(null)
const isLoading = ref<boolean>(false)

onMounted(() => {
  isLoading.value = true
  axios
    .get<EventDetailsBackendType[]>(`${import.meta.env.VITE_APP_EVENTS_URL}/events`)
    .then((res) => {
      if (res.status == 200) {
        events.value = TransformDataFromBacked(res.data)
        isLoading.value = false
      }
    })
    .catch((err) => {
      console.error('my error', err)
      isError.value = err.message
      isLoading.value = false
    })
})
</script>
