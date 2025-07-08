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
  <div class="d-flex flex-column w-100">
    <div class="d-flex w-100">
      <VLabel :text="fieldDetails.label" class="label-min-w" />
      <input ref="fieldRef" class="field" :type="fieldDetails.type" @keydown="onAddBand" />
    </div>
    <VContainer>
      <VRow justify="center">
        <VChipGroup v-if="bands.size" mobile>
          <VChip v-for="band of bands" :text="band" @click="onDeleteBand(band)" />
        </VChipGroup>
      </VRow>
    </VContainer>
  </div>
</template>
<style scoped lang="css">
.field {
  border: 1px solid #37566f;
  background-color: #0b212b;
  border-radius: 5px;
  padding: 12px 14px;
  width: 100%;
}

.label-min-w {
  min-width: 70px !important;
}
</style>
