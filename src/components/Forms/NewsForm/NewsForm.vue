<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { NewsType } from '@/components/Table/abstract.ts'
import { useSetFormData } from '@/composables/useForm.ts'
import { onBeforeMount } from 'vue'

const { formData } = useSetFormData<NewsType>()
const newsForm = useForm<Omit<NewsType, 'id'>>()

onBeforeMount(() => {
  if (formData.value) {
    newsForm.setValues({
      ...formData.value,
    })
  }
})
</script>

<template>
  <h2>News Form</h2>
  {{ newsForm }}
  <VForm></VForm>
</template>

<style scoped lang="css"></style>
