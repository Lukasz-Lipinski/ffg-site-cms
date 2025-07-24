<template>
  <VTable class="table-border">
    <VDataTable
      :style="{
        overflow: 'hidden',
      }"
      class="table-data_box"
      :items="data"
      :headers="headers"
      hover
      no-data-text="No eEvents added"
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
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUpdate, ref, toRef, watch } from 'vue'
import { type DataTableHeader } from 'vuetify/lib/components/VDataTable/types.mjs'
import { SetHeaders } from './table.service'
import type { EventType } from './abstract'

type TablePropsType = {
  data: EventType[]
<<<<<<< HEAD
  selectedItem: EventType | undefined
=======
  selectedItem: EventType | null
>>>>>>> c6a6123 (new typo added)
}

const headers = ref<DataTableHeader[]>([])
const props = defineProps<TablePropsType>()
const selectedItem = ref<EventType | undefined>()
const emits = defineEmits(['selectedItem'])

onBeforeMount(() => {
  headers.value = SetHeaders(props.data[0], ['id'])
})

watch(
  () => props.selectedItem,
  () => {
    selectedItem.value = props.selectedItem
  },
)

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
  transition: background-color 0.3s ease;
}

.table-border {
  background: linear-gradient(45deg, #082a69, #4e3060), padding-box;
  border-radius: 24px;
  padding: 2px;
}

.table-data_box {
  padding: 12px 20px;
  background: linear-gradient(90deg, #122443, #060716);
}
</style>
