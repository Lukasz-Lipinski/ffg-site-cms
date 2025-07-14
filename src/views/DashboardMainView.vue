<script setup lang="ts">
import TableComponent from '@/components/Table/TableComponent.vue'
import { VSkeletonLoader } from 'vuetify/components'
import ErrorComponent from '@/components/Error/ErrorComponent.vue'
import { useFetchEvents } from '@/composables/useFetchData.ts'
import { inject, type Ref } from 'vue'
import type { EventType } from '@/components/Table/abstract.ts'

const { errors, events, isLoading, onRefresh } = await useFetchEvents()

const selectedItem = inject<Ref<EventType>>('selectedItem')
</script>

<template>
  <VSkeletonLoader v-if="isLoading" type="table" />
  <TableComponent
    v-else-if="events?.length && !isLoading && !errors"
    :data="events"
    @selected-item="selectedItem = $event"
    :selectedItem="selectedItem"
  />
  <ErrorComponent v-else-if="!!errors" :msg="errors" @onRefresh="onRefresh()" />
</template>

<style scoped lang="css"></style>
