<template>
  <VContainer width="50%">
    <VAlert type="error">
      <template #prepend></template>
      <template #title>
        <VContainer fluid class="center">
          <span data-testid="error-title"> Something went wrong </span>
        </VContainer>
      </template>
      <template #text>
        <p>{{ msg }}. Please refresh page to reload data or try again later.</p>
      </template>
      <template #default>
        <div class="center">
          <VBtn
            variant="outlined"
            size="small"
            prepend-icon="mdi mdi-refresh"
            @click="emit('onRefresh')"
          >
            <span>Refresh</span>
          </VBtn>
        </div>
      </template>
    </VAlert>
  </VContainer>
</template>

<script lang="ts" setup>
import { VAlert, VContainer, VBtn } from 'vuetify/components'

defineProps<{
  msg: string | undefined
}>()

const emit = defineEmits(['onRefresh'])
</script>

<style lang="css" scoped>
.center {
  display: flex;
  justify-content: center;
}

button {
  margin-top: 20px;
}

p {
  text-align: justify;
}
</style>
