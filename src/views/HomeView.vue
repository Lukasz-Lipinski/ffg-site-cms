<template>
  <VContainer>
    <VSkeletonLoader v-if="!events.length && isLoading" type="table" />
    <TableComponent
      v-else-if="events.length && !isLoading"
      :data="events"
      @selected-item="setSeletectItem($event)"
    />
    <ErrorComponent v-else-if="errorMsg" :msg="errorMsg" @on-refresh="fetchData" />
    <VDialog v-model="isOpenedModal">
      <template #default>
        {{ selectedItem }}
      </template>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import ErrorComponent from '@/components/Error/ErrorComponent.vue'
import type { EventDetailsBackendType, EventType } from '@/components/Table/abstract'
import { TransformDataFromBacked } from '@/components/Table/table.service'
import TableComponent from '@/components/Table/TableComponent.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { VContainer, VSkeletonLoader } from 'vuetify/components'

const events = ref<EventType[]>([])
const errorMsg = ref<string | null>(null)
const isLoading = ref<boolean>(false)
const selectedItem = ref<EventType | null>()
const isOpenedModal = computed(() => !!selectedItem.value)

function setSeletectItem(item: EventType) {
  selectedItem.value = item
}

function fetchData() {
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
      errorMsg.value = err.message
      isLoading.value = false
    })
}

onMounted(() => {
  fetchData()
})
</script>
