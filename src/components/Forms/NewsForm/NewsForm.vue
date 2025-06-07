<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { NewsType } from '@/components/Table/abstract'
import { useSetFormData } from '@/composables/useForm'
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
