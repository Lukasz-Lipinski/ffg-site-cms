<script setup lang="ts">
import { useField } from 'vee-validate'
import { type LabelAndFieldType } from '@/composables/useForm.ts'
import { onBeforeMount, reactive, ref, watchEffect } from 'vue'

const props = defineProps<{
  fieldDetails: LabelAndFieldType
  initialValues: string[]
}>()

const { value } = useField(() => props.fieldDetails.field)

onBeforeMount(() => {
  for (let band of props.initialValues) {
    bands.add(band)
  }
})

const bands = reactive<Set<string>>(new Set())
const fieldRef = ref<HTMLInputElement>()

function onAddBand($event: KeyboardEvent) {
  if ($event.key.toLowerCase() === 'enter' && bands.size < 8) {
    bands.add(($event.target as HTMLInputElement).value as string)
    value.value = Array.from(bands)
    fieldRef.value!.value = ''
  }
}

watchEffect(() => {
  value.value = Array.from(bands)
})

function onDeleteBand(band: string) {
  bands.delete(band)
}
</script>

<template>
  <div class="d-flex flex-column">
    <span>
      <VLabel :text="fieldDetails.label" />
      <input ref="fieldRef" :type="fieldDetails.type" @keydown="onAddBand" />
    </span>
    <VChipGroup v-if="bands.size" mobile>
      <VChip v-for="band of bands" :text="band">
        <template #prepend>
          <VBtn @click="onDeleteBand(band)" variant="text" color="error" icon="mdi-close"></VBtn>
        </template>
      </VChip>
    </VChipGroup>
  </div>
</template>
<style scoped lang="css"></style>
