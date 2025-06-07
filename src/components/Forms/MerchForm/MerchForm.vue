<script setup lang="ts">
// import { useForm } from 'vee-validate'
// import type { MerchType } from '@/components/Table/abstract'
// import { useSetFormData } from '@/composables/useForm'
import { onBeforeMount } from 'vue'

// const merchForm = useForm<Omit<MerchType, 'id'>>()
// const { formData } = useSetFormData<MerchType>()

onBeforeMount(() => {
  // if (formData.value) {
  //   merchForm.setValues({
  //     ...formData.value,
  //   })
  // }
})
</script>

<template>
  <h2>Merch Form</h2>
  <VForm></VForm>
</template>

<style scoped lang="css"></style>
