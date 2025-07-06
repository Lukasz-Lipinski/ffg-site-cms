<script setup lang="ts">
import { useForm, Field, ErrorMessage } from 'vee-validate'
import type { EventFromBackendType, EventType } from '@/components/Table/abstract'
import { useFieldNames, useSetFormData } from '@/composables/useForm.ts'
import { onBeforeMount } from 'vue'
import * as yup from 'yup'
import BandsInput from '@/components/BandsInput/BandsInput.vue'
import FormLayout from '@/components/Forms/FormLayout/FormLayout.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'

const { formData } = useSetFormData<EventType>()
const exceptions = ['id', 'dateOfInsert', 'dateOfUpdate', 'addingEventUser']
const labelsAndFields = useFieldNames<EventFromBackendType>(exceptions)
const { setValues, values, resetForm } = useForm<Omit<EventFromBackendType, 'id'>>()

const validationSchemas = {
  title: yup.string().required().min(1).max(40),
  description: yup.string().required().min(1).max(200),
  bands: yup.array().min(2).required(),
  date: yup.date().required(),
  time: yup.number().required().min(0).max(24),
  location: yup.string().required().min(1).max(20),
  price: (val: unknown) => {
    return /\^(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)/.test(val as string)
  },
  status: yup.string().required(),
}

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

function onReset() {
  resetForm()
}
</script>

<template>
  <FormLayout>
    <template #form>
      <VForm class="d-flex flex-column event-form text-color">
        <template v-for="(laf, index) in labelsAndFields" :key="laf.label + index">
          <VRow no-gutters>
            <BandsInput
              v-if="laf.label.toLowerCase() === 'bands'"
              :fieldDetails="laf"
              :initialValues="values.bands"
            ></BandsInput>
            <template v-else>
              <VCol cols="12">
                <VLabel :text="laf.label" class="text-color font-weight-medium p-0" />
              </VCol>
              <VCol>
                <Field
                  class="field"
                  :label="laf.label"
                  :rules="validationSchemas[laf.field as keyof typeof validationSchemas]"
                  :type="laf.type"
                  :name="laf.field"
                  :disabled="laf.disabled"
                ></Field>
              </VCol>
            </template>
          </VRow>
          <VRow>
            <ErrorMessage :name="laf.field" />
          </VRow>
        </template>
      </VForm>
    </template>
    <template #actions>
      <FooterComponent
        center
        left-button-label="Update"
        right-button-label="Delete"
        @left-button-action="onSubmit()"
        @right-button-action="onReset()"
      />
    </template>
  </FormLayout>
</template>

<style scoped lang="css">
.event-form {
  gap: 10px;
}

.text-color {
  color: #dce9f1;
}

.field {
  border: 1px solid #37566f;
  background-color: #0b212b;
  border-radius: 5px;
  padding: 12px 14px;
  width: 100%;
}
</style>
