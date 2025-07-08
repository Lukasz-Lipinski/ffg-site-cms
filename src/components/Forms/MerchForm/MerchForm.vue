<script setup lang="ts">
import { Field, useForm, useIsFormValid } from 'vee-validate'
import type { MerchFromBackendType, MerchType } from '@/components/Table/abstract'
import { onBeforeMount } from 'vue'
import { useFieldNames, useSetFormData } from '@/composables/useForm.ts'
import FormLayout from '@/components/Forms/FormLayout/FormLayout.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'

const exceptions = ['id', 'dateOfInsert', 'dateOfUpdate', 'addingEventUser']
const labelsAndFields = useFieldNames(exceptions)
const { setValues, isFieldValid } =
  useForm<Omit<MerchFromBackendType, 'id' | 'addingEventUser' | 'dateOfInsert' | 'dateOfUpdate'>>()
const { formData } = useSetFormData<MerchType>()

const isFormValid = useIsFormValid()

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
      <VForm class="d-flex flex-column merch-form text-color">
        <template v-for="(laf, index) in labelsAndFields" :key="laf.label + index">
          <VRow :class="index === 8 ? '' : 'mb-5'" no-gutters>
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
                :type="laf.type"
                :name="laf.field"
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
.merch-form {
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
