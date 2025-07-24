<template>
  <section>{{ route.meta }}</section>
  <!-- <component :is="FormSwitcher()" /> -->
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style lang="css"></style>
