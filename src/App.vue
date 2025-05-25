<template>
  <VApp>
    <VMain>
      <RouterView></RouterView>
    </VMain>
    <VSnackbar
      :timeout="snackbarStore.timeout"
      :color="snackbarStore.color"
      :model-value="snackbarStore.isShown"
    >
      {{ snackbarStore.text }}
    </VSnackbar>
  </VApp>
</template>

<script lang="ts" setup>
import { VApp, VMain } from 'vuetify/components'
import { useSnackbarStore } from './stores/snackbar.ts'
import { watch } from 'vue'

const snackbarStore = useSnackbarStore().snackbar
let timer: any;

watch(() => snackbarStore.isShown,
  (value) => {
  if (value) {
    timer = setTimeout(() => {
      snackbarStore.isShown = false
    }, snackbarStore.timeout)
  }

  return () => {
    clearTimeout(timer)
  }
})
</script>

<style lang=""></style>
