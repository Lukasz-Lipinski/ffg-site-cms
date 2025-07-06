<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  formName: string
}>()

const emit = defineEmits(['onClose'])

const title = computed(() => {
  switch (props.formName) {
    case 'EventForm':
      return 'Update Event'
    case 'MerchForm':
      return 'Update Merch'
    case 'NewsForm':
      return 'Update News'
    default:
      return ''
  }
})
</script>

<template>
  <div class="d-flex align-center justify-space-between">
    <VCardTitle>{{ title }}</VCardTitle>
    <VBtn
      @click="emit('onClose')"
      style="margin: 0"
      variant="text"
      color="error"
      icon="mdi-close"
    />
  </div>
</template>

<style scoped lang="css"></style>
