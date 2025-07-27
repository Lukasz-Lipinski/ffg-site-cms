<template>
  <VContainer>
    <VSkeletonLoader v-if="!data?.length && isLoading" type="table" />
    <TableComponent
      v-else-if="data?.length && !isLoading"
      :data="data"
      @selected-item="selectedItem = $event"
      :selectedItem="selectedItem"
    />
    <ErrorComponent v-else-if="errorMsg" :msg="errorMsg" @on-refresh="fetchData" />
    <VDialog opacity="false" scrim="#212121" v-model="isOpenedModal">
      <template #default>
        <ModalForm :event="selectedItem">
          <template #close-button>
            <VBtn @click="onClose" variant="text" color="error" icon="mdi-close"></VBtn>
          </template>
        </ModalForm>
      </template>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import ErrorComponent from '@/components/Error/ErrorComponent.vue'
import type { BackendDataType, EventType } from '@/components/Table/abstract'
import { TransformDataFromBacked } from '@/components/Table/table.service'
import TableComponent from '@/components/Table/TableComponent.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { VContainer, VSkeletonLoader } from 'vuetify/components'
import ModalForm from '@/components/Modal/Content/ModalForm.vue'

const data = ref<EventType[]>([])
const errorMsg = ref<string | null>(null)
const isLoading = ref<boolean>(false)
const selectedItem = ref<EventType | undefined>(undefined)
const isOpenedModal = computed(() => !!selectedItem.value)

function fetchData() {
  isLoading.value = true
  axios
    .get<BackendDataType>(`${import.meta.env.VITE_APP_EVENTS_URL}/data`)
    .then((res) => {
      if (res.status == 200) {
        data.value = []

        for (const respond of Object.values(res.data)) {
          data.value.push(...TransformDataFromBacked(respond))
        }
        console.log(data.value)
        isLoading.value = false
      }
    })
    .catch((err) => {
      errorMsg.value = err.message
      isLoading.value = false
    })
}

function onClose() {
  selectedItem.value = null
}

onMounted(() => {
  fetchData()
})
</script>
