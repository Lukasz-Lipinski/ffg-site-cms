<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import type { EventFromBackendType, EventType } from '@/components/Table/abstract'
import { useFieldNames, useSetFormData } from '@/composables/useForm.ts'
import { onBeforeMount } from 'vue'

const { formData } = useSetFormData<EventType>()
const exceptions = ['id', 'dateOfInsert', 'dateOfUpdate', 'addingEventUser']
const labelsAndFields = useFieldNames<EventFromBackendType>(exceptions)
const { setValues, values } = useForm<Omit<EventFromBackendType, 'id'>>()

onBeforeMount(() => {
  if (formData.value) {
    setValues({
      ...formData.value,
    })
  }
})

function onSubmit() {
  console.log(values)
}
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <h1 class="text-center">Event Form</h1>
    <VForm @submit.prevent="onSubmit">
      <template v-for="(laf, index) in labelsAndFields" :key="laf.label + index">
        <VRow>
          <Field :name="laf.field" v-slot="{ field }">
            <VLabel>{{ laf.label }}</VLabel>
            <VDateInput :value="labelsAndFields[index].field" v-bind="field" />
          </Field>
        </VRow>
      </template>
      <VBtn type="submit">Update</VBtn>
      <VBtn>Delete</VBtn>
    </VForm>
  </div>
</template>

<style scoped lang="css"></style>
