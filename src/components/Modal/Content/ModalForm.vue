<template>
  <VContainer fluid>
    <VRow justify="end">
      <slot name="close-button"></slot>
    </VRow>
    <VRow justify="center">
      <slot></slot>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup></script>
