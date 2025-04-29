<template>
  <VDialog fullscreen>
    <slot> test </slot>
  </VDialog>
</template>

<script lang="ts" setup>
import { VDialog } from 'vuetify/components'
import { type EventType } from '../Table/abstract'
import { ref } from 'vue'

const props = defineProps<{
  selectedItem: EventType | null
}>()
</script>

<style lang=""></style>
