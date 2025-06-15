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
    <VDialog fullscreen opacity="false" scrim="#212121" v-model="isOpenedModal" contained>
      <template #default>
        <ModalForm :event="selectedItem">
          <template #close-button>
            <VBtn @click="onClose" variant="text" color="error" icon="mdi-close"></VBtn>
          </template>
          <template #default>
            <FormSwitcher :form-name="selectedForm!" />
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
import { computed, onMounted, provide, type Ref, ref, watch } from 'vue'
import { VContainer, VSkeletonLoader } from 'vuetify/components'
import ModalForm from '@/components/Modal/Content/ModalForm.vue'
import FormSwitcher from '@/components/Forms/FormSwitcher/FormSwitcher.vue'
import type { FormType } from '@/components/Forms/FormSwitcher/abstracts.ts'

const data = ref<EventType[]>([])
const allEventsFromBackend = ref<BackendDataType | null>(null)
const errorMsg = ref<string | null>(null)
const isLoading = ref<boolean>(false)
const selectedItem = ref<EventType | null>(null)
const selectedForm = ref<FormType | null>(null)

const isOpenedModal = computed(() => !!selectedItem.value)

provide<Ref<EventType | null>>('selectedItem', selectedItem)
provide<Ref<BackendDataType | null>>('allEvents', allEventsFromBackend)

watch(
  () => selectedItem.value,
  (val) => {
    if (val) {
      switch (val!.type) {
        case 'events':
          selectedForm.value = 'EventForm'
          break
        case 'merch':
          selectedForm.value = 'MerchForm'
          break
        case 'news':
          selectedForm.value = 'NewsForm'
          break
        default:
          selectedForm.value = null
          break
      }
    }
  },
)

function fetchData() {
  isLoading.value = true
  axios
    .get<BackendDataType>(`${import.meta.env.VITE_APP_EVENTS_URL}/data`)
    .then((res) => {
      if (res.status == 200) {
        data.value = []
        allEventsFromBackend.value = res.data

        for (let respond of Object.values(res.data)) {
          data.value.push(...TransformDataFromBacked(respond))
        }
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
