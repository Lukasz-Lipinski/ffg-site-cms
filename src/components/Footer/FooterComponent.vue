<script setup lang="ts">
import { computed } from 'vue'

defineEmits(['leftButtonAction', 'rightButtonAction'])

const props = defineProps<{
  leftButtonLabel: string
  isLeftButtonDisabled: boolean
  rightButtonLabel: string
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
      :disabled="!isLeftButtonDisabled"
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

#left-btn {
  background-color: #2ecc71;
  color: #fff;
  transition: background-color 0.2s ease;
}

#left-btn:hover {
  background-color: #27ae60;
}

#left-btn:disabled {
  background-color: #2c3e50;
}

#right-btn {
  background-color: #e74c3c;
  color: #fff;
  transition: background-color 0.2s ease;
}

#right-btn:hover {
  background-color: #c0392b;
}
</style>
