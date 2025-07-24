<script setup lang="ts">
import { computed } from 'vue'

defineEmits(['leftButtonAction', 'rightButtonAction'])

const props = defineProps<{
  leftButtonLabel: string
  isLeftButtonDisabled: boolean
  leftButtonIcon?: string
  rightButtonLabel: string
  rightButtonIcon?: string
  center?: boolean
  space?:
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
}>()

const classes = computed(() => {
  let defaultClasses = `d-flex gc-${props.space}`

  if (props.center) {
    defaultClasses += ' justify-center'
  }

  return defaultClasses
})
</script>

<template>
  <VContainer :class="classes">
    <VBtn
      type="button"
      id="left-btn"
      color="#154C82"
      :prepend-icon="leftButtonIcon"
      :disabled="!isLeftButtonDisabled"
      @click.prevent="() => $emit('leftButtonAction')"
      >{{ leftButtonLabel }}</VBtn
      >
      <VBtn
      type="button"
      id="right-btn"
      :prepend-icon="rightButtonIcon"
      @click="() => $emit('rightButtonAction')"
      >{{ rightButtonLabel }}</VBtn
    >
  </VContainer>
</template>

<style scoped lang="css">
.text-color {
  color: #dce9f1;
}

#left-btn:disabled {
  background-color: #2c3e50;
}

#right-btn {
  background-color: transparent;
  color: #CCCCCC;
  transition: background-color 0.2s ease;
}

#right-btn:hover {
  background-color: #D90429;
}
</style>
