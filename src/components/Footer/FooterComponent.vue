<script setup lang="ts">
import { computed } from 'vue'

defineEmits(['leftButtonAction', 'rightButtonAction'])

const props = defineProps<{
  leftButtonLabel: string
  rightButtonLabel: string
  center?: boolean
  space?: number
}>()

const classes = computed(() => {
  let defaultClasses = `d-flex gap-${props.space}`

  if (props.center) {
    defaultClasses += ' center'
  }

  return defaultClasses
})
</script>

<template>
  <VContainer :class="classes">
    <VBtn
      type="button"
      id="left-btn"
      class="text-color"
      @click.prevent="() => $emit('leftButtonAction')"
      >{{ leftButtonLabel }}</VBtn
    >
    <VBtn
      type="button"
      id="right-btn"
      class="text-color"
      @click="() => $emit('rightButtonAction')"
      >{{ rightButtonLabel }}</VBtn
    >
  </VContainer>
</template>

<style scoped lang="css">
.text-color {
  color: #dce9f1;
}
</style>
