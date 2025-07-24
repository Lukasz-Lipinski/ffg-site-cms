<script setup lang="ts">
import { useForm, Field, useIsFormValid } from 'vee-validate'
import type { EventFromBackendType, EventType } from '@/components/Table/abstract'
import { useFieldNames, useSetFormData } from '@/composables/useForm.ts'
import { inject, onBeforeMount, type Ref } from 'vue'
import * as yup from 'yup'
import BandsInput from '@/components/BandsInput/BandsInput.vue'
import FormLayout from '@/components/Forms/FormLayout/FormLayout.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import axios from 'axios'

const { formData } = useSetFormData<EventType>()
const exceptions = ['id', 'dateOfInsert', 'dateOfUpdate', 'addingEventUser']
const labelsAndFields = useFieldNames<EventFromBackendType>(exceptions)
const { setValues, values, resetForm, isFieldValid } =
  useForm<Omit<EventFromBackendType, 'id' | 'dateOfInsert' | 'dateOfUpdate' | 'addingEventUser'>>()

const isFormValid = useIsFormValid()
const validationSchemas = {
  title: yup.string().required().min(1).max(40),
  description: yup.string().required().min(1).max(200),
  bands: (val: unknown) => (val as []).length > 2,
  date: yup.date().required(),
  time: yup.number().required().min(0).max(24),
  location: yup.string().required().min(1).max(20),
  price: (val: unknown) => {
    return /^\d+(\.\d{1,2})?$/.test(val as string)
  },
  status: yup.string().required(),
}

const selectedItem = inject<Ref<EventType>>('selectedItem')

onBeforeMount(() => {
  if (formData.value) {
    setValues({
      ...formData.value,
    })
  }
})

async function onSubmit() {
  const data: EventFromBackendType = {
    ...values,
    id: selectedItem!.value!.id,
    dateOfInsert: selectedItem!.value!.date,
    dateOfUpdate: Date.now(),
    addingEventUser: {
      ...selectedItem!.value!.user,
    },
  }
  await axios.put(`${import.meta.env.VITE_APP_API_URL}/events/${selectedItem!.value!.id}`, data)
}

function onDelete() {
  resetForm()
}
</script>

<template>
  <FormLayout>
    <template #form>
      <VForm class="d-flex flex-column event-form text-color">
        <template v-for="(laf, index) in labelsAndFields" :key="laf.label + index">
          <VRow :class="index === 8 ? '' : 'mb-5'" no-gutters>
            <BandsInput
              v-if="laf.label.toLowerCase() === 'bands'"
              :fieldDetails="laf"
              :initialValues="values.bands"
            ></BandsInput>
            <template v-else>
              <VCol cols="12">
                <VLabel
                  :text="laf.label"
                  class="text-color font-weight-medium p-0"
                  :class="!isFieldValid(laf.field as any) && 'alert'"
                />
              </VCol>
              <VCol>
                <Field
                  :class="!isFieldValid(laf.field as any) && 'alert invalid-input'"
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
        </template>
      </VForm>
    </template>
    <template #actions>
      <FooterComponent
        center
        space="6"
        :is-left-button-disabled="isFormValid"
        left-button-label="Update"
        right-button-label="Delete"
        @left-button-action="onSubmit()"
        @right-button-action="onDelete()"
        right-button-icon="mdi-delete"
      />
    </template>
  </FormLayout>
</template>

<style scoped lang="css">
.event-form {
  gap: 10px;
}

.text-color {
  color:  #62F2FA ;
}

.invalid-input {
  border-color: #ff4c4c !important;
  background: #331111 !important;
  outline: #ff4c4c !important;
}

.alert {
  color: #ff4c4c !important;
}

.field {
  border: 1px solid #154C82;
  background-color: transparent;
  border-radius: 5px;
  padding: 12px 14px;
  width: 100%;
  color: #93C8FA
}
</style>
