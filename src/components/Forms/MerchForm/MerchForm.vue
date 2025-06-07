<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { MerchType } from '@/components/Table/abstract'
import { onBeforeMount } from 'vue'
import { useSetFormData } from '@/composables/useForm'

const merchForm = useForm<Omit<MerchType, 'id'>>()
const { formData } = useSetFormData<MerchType>()

onBeforeMount(() => {
  if (formData.value) {
    merchForm.setValues({
      ...formData.value,
    })
  }
})
</script>

<template>
  <h2>Merch Form</h2>
  {{ merchForm }}
  <VForm></VForm>
</template>

<style scoped lang="css"></style>
