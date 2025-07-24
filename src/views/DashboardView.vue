<template>
  <VMain scrollable class="background_content">
    <VContainer>
      <MenuComponent />
      <RouterView />
    </VContainer>
  </VMain>
  <VDialog offset="200"  v-model="isOpenedModal" max-width="920px">
    <template #default>
      <VCard class="background_content">
        <template #title>
          <TitleTileComponent :formName="selectedForm!" @onClose="onClose" />
        </template>
        <ModalForm :event="selectedItem" class="background_content">
          <template #default>
            <FormSwitcher :form-name="selectedForm!" />
          </template>
        </ModalForm>
      </VCard>
    </template>
  </VDialog>
</template>

<script setup async lang="ts">
import MenuComponent from '@/components/Menu/MenuComponent.vue'
import type { BackendDataType, EventType } from '@/components/Table/abstract'
import { computed, provide, type Ref, ref, watch } from 'vue'
import type { FormType } from '@/components/Forms/FormSwitcher/abstracts.ts'
import { useFetchEvents } from '@/composables/useFetchData.ts'
import TitleTileComponent from '@/components/Modal/TitleTile/TitleTileComponent.vue'
import ModalForm from '@/components/Modal/Content/ModalForm.vue'
import FormSwitcher from '@/components/Forms/FormSwitcher/FormSwitcher.vue'

const { allEventsFromBackend } = await useFetchEvents()

const selectedItem = ref<EventType | undefined>(undefined)
const selectedForm = ref<FormType | undefined>(undefined)

const isOpenedModal = computed(() => !!selectedItem.value)

provide<Ref<EventType | undefined>>('selectedItem', selectedItem)
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
          selectedForm.value = undefined
          break
      }
    }
  },
)

function onClose() {
  selectedItem.value = undefined
}
</script>

<style lang="css" scoped>

.card-background_modal {
  background-color: transparent;
}

.background_content {
  background: linear-gradient(90deg, #122443, #060716);
}
</style>
