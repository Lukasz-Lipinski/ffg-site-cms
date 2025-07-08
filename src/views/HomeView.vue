<template>
  <VContainer>
    <VSkeletonLoader v-if="isLoading" type="table" />
    <TableComponent
      v-else-if="events?.length && !isLoading && !errors"
      :data="events"
      @selected-item="selectedItem = $event"
      :selectedItem="selectedItem"
    />
    <ErrorComponent v-else-if="!!errors" :msg="errors" @onRefresh="onRefresh()" />
    <VDialog offset="200" v-model="isOpenedModal" max-width="920px">
      <template #default>
        <VCard class="card-background">
          <template #title>
            <TitleTileComponent :formName="selectedForm!" @onClose="onClose" />
          </template>
          <ModalForm :event="selectedItem" class="background">
            <template #default>
              <FormSwitcher :form-name="selectedForm!" />
            </template>
          </ModalForm>
        </VCard>
      </template>
    </VDialog>
  </VContainer>
</template>

<script setup async lang="ts">
import ErrorComponent from '@/components/Error/ErrorComponent.vue'
import type { BackendDataType, EventType } from '@/components/Table/abstract'
import TableComponent from '@/components/Table/TableComponent.vue'
import { computed, provide, type Ref, ref, watch } from 'vue'
import { VContainer, VSkeletonLoader } from 'vuetify/components'
import ModalForm from '@/components/Modal/Content/ModalForm.vue'
import FormSwitcher from '@/components/Forms/FormSwitcher/FormSwitcher.vue'
import type { FormType } from '@/components/Forms/FormSwitcher/abstracts.ts'
import TitleTileComponent from '@/components/Modal/TitleTile/TitleTileComponent.vue'
import { useFetchEvents } from '@/composables/useFetchData.ts'

const { events, isLoading, errors, allEventsFromBackend, onRefresh } = await useFetchEvents()

const selectedItem = ref<EventType | null>(null)
const selectedForm = ref<FormType | null>(null)

const isOpenedModal = computed(() => !!selectedItem.value)

provide<Ref<EventType | null>>('selectedItem', selectedItem)
provide<Ref<BackendDataType | undefined>>('allEvents', allEventsFromBackend)

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

function onClose() {
  selectedItem.value = null
}
</script>

<style lang="css" scoped>
.background {
  background-color: #091418;
}

.card-background {
  background-color: #0b212b;
}
</style>
