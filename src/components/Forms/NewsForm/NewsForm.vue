<script setup lang="ts">
import { Field, useForm, useIsFormValid } from 'vee-validate'
import type { NewsFromBackendType, NewsType } from '@/components/Table/abstract'
import * as yup from 'yup'
import { useFieldNames, useSetFormData } from '@/composables/useForm.ts'
import { onBeforeMount } from 'vue'
import FormLayout from '@/components/Forms/FormLayout/FormLayout.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'

const { formData } = useSetFormData<NewsType>()
const exceptions = ['id', 'dateOfInsert', 'addingEventUser', 'dateOfUpdate']
const labelsAndFields = useFieldNames<NewsFromBackendType>(exceptions)
const { isFieldValid, setValues } =
  useForm<Omit<NewsFromBackendType, 'id' | 'dateOfInsert' | 'addingEventUser' | 'dateOfUpdate'>>()

const isFormValid = useIsFormValid()

const validationSchemas = {
  title: yup.string().required(),
  description: yup.string().required().max(200),
  contentUrl: (val: unknown) => /^https?:\/\/[^\s]+$/.test(val as string),
}

onBeforeMount(() => {
  if (formData.value) {
    setValues({
      ...formData.value,
    })
  }
})

function onSubmit() {}

function onReset() {}
</script>

<template>
  <FormLayout>
    <template #form>
      <VForm class="d-flex flex-column news-form text-color">
        <template v-for="(laf, index) in labelsAndFields" :key="laf.label + index">
          <VRow :class="index === 8 ? '' : 'mb-5'" no-gutters>
            <VCol cols="12">
              <VLabel
                :text="laf.label"
                class="text-color font-weight-medium p-0"
                :class="!isFieldValid(laf.field as any) && 'alert'"
                style="resize: none"
              />
            </VCol>
            <VCol>
              <Field
                v-if="laf.label.toLowerCase() === 'description'"
                as="textarea"
                :label="laf.label"
                :name="laf.field"
                :class="!isFieldValid(laf.field as any) && 'alert invalid-input'"
                class="field"
                style="resize: none"
                :rules="validationSchemas[laf.field as keyof typeof validationSchemas]"
                :disabled="laf.disabled"
                rows="8"
              />
              <Field
                v-else
                :class="!isFieldValid(laf.field as any) && 'alert invalid-input'"
                class="field"
                :label="laf.label"
                :type="laf.type"
                :name="laf.field"
                :rules="validationSchemas[laf.field as keyof typeof validationSchemas]"
                :disabled="laf.disabled"
              ></Field>
            </VCol>
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
        @right-button-action="onReset()"
      />
    </template>
  </FormLayout>
</template>

<style scoped lang="css">
.news-form {
  gap: 10px;
}

.text-color {
  color: #dce9f1;
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
  border: 1px solid #37566f;
  background-color: #0b212b;
  border-radius: 5px;
  padding: 12px 14px;
  width: 100%;
}
</style>
