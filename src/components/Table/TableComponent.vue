<template>
  <VContainer min-height="80%" width="90%">
    <VTable>
      <VDataTable :items="data" :headers="headers" no-data-text="Events added">
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
  <ModalComponent :selected-item="selectedItem" />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { type DataTableHeader } from 'vuetify/lib/components/VDataTable/types.mjs'
import { SetHeaders } from './table.service'
import type { EventType } from './abstract'
import ModalComponent from '../Modal/ModalComponent.vue'

type TablePropsType = {
  data: EventType[]
}

const headers = ref<DataTableHeader[]>([])
const props = defineProps<TablePropsType>()
const selectedItem = ref<EventType | null>(null)

onBeforeMount(() => {
  headers.value = SetHeaders(props.data[0], ['id'])
})
</script>

<style lang="css" scoped>
.item:hover {
  cursor: pointer !important;
  background-color: hsl(0, 0%, 52%);
  transition: background-color 0.3s ease;
}
</style>
