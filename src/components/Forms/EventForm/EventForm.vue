<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { EventType } from '@/components/Table/abstract'
import { useSetFormData } from '@/composables/useForm.ts'
import { onBeforeMount } from 'vue'

const { formData } = useSetFormData<EventType>()
const eventForm = useForm<Omit<EventType, 'id'>>()

onBeforeMount(() => {
  if (formData.value) {
    eventForm.setValues({
      ...formData.value,
    })
  }
})
</script>

<template>
  <h2>Event Form</h2>
  {{ eventForm }}
  <VForm> </VForm>
</template>

<style scoped lang="css"></style>
