<template>
<<<<<<< HEAD
  <VContainer fluid>
    <VRow justify="end">
      <slot name="close-button"></slot>
    </VRow>
    <VRow justify="center">
      <slot></slot>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup></script>
=======
  <div class="justify-end d-flex">
    <slot name="close-button"></slot>
  </div>
  <VForm>
    <VRow>
      <VTextField label="Title" :model-value="titleInput" />
      <VTextField label="Type" :model-value="typeInput" />
      <VTextField label="Bands" :model-value="bandsInput" />
    </VRow>
    <VRow>
      <VTextField label="Start Time" :model-value="startInput" />
      <VTextField label="Event Date" :model-value="eventDateInput" />
      <VTextField label="Location" :model-value="locationInput" />
    </VRow>
    <VRow>
      <VTextField :model-value="priceInput" />
      <VTextField :model-value="linkToEventInput" />
      <VTextField :model-value="linkToBuyTicketsInput" />
    </VRow>
    <VBtn type="submit">Save</VBtn>
  </VForm>
</template>

<script lang="ts" setup>
import type {
  EventTypeType,
  EventType,
  AddingEventUserType,
  EventDetailsForBackendType,
} from '@/components/Table/abstract.ts'
import { ref, defineProps } from 'vue'

const typeInput = ref<EventTypeType>('gig')
const titleInput = ref<string>('')
const bandsInput = ref<string[]>([])
const eventDateInput = ref<Date>(new Date())
const locationInput = ref<string>('')
const priceInput = ref<number>(0)
const startInput = ref<Date>(new Date())
const linkToEventInput = ref<string>('')
const linkToBuyTicketsInput = ref<string>('')

defineProps<{
  event: EventType | null
}>()

function onSaveEvent() {}
</script>

<style lang="css" scoped>
.modal-form-background {
  background-color: #212121;
}
</style>
>>>>>>> c6a6123 (new typo added)
