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
    <VCardTitle class="title-color">{{ title }}</VCardTitle>
    <VBtn
      @click="emit('onClose')"
      style="margin: 0"
      variant="text"
      color="#FF4D6D"
      icon="mdi-close"
    />
  </div>
</template>

<style scoped lang="css">
.title-color {
  color:  #CCCCCC
}
</style>
