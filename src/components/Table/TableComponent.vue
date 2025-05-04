<template>
  <VContainer width="90%">
    <VTable>
      <VDataTable
        :style="{
          overflow: 'hidden',
        }"
        :items="data"
        :headers="headers"
        no-data-text="Events added"
      >
        <template v-slot:item="{ item }">
          <tr @click="selectedItem = item" class="item">
            <td>{{ item.date }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.type }}</td>
          </tr>
        </template>
      </VDataTable>
    </VTable>
  </VContainer>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import { type DataTableHeader } from 'vuetify/lib/components/VDataTable/types.mjs'
import { SetHeaders } from './table.service'
import type { EventType } from './abstract'

type TablePropsType = {
  data: EventType[]
}

const headers = ref<DataTableHeader[]>([])
const props = defineProps<TablePropsType>()
const selectedItem = ref<EventType | null>(null)
const emits = defineEmits(['selectedItem'])

onBeforeMount(() => {
  headers.value = SetHeaders(props.data[0], ['id'])
})

watch(
  () => selectedItem.value,
  () => {
    emits('selectedItem', selectedItem.value)
  },
)
</script>

<style lang="css" scoped>
.item:hover {
  cursor: pointer !important;
  background-color: hsl(0, 0%, 52%);
  transition: background-color 0.3s ease;
}
</style>
