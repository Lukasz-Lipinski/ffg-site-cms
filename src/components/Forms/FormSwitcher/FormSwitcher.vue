<template>
  <Component :is="Form" />
</template>

<script setup lang="ts">
import { type Component, defineAsyncComponent, onBeforeMount } from 'vue'
import type { FormType } from '@/components/Forms/FormSwitcher/abstracts'

const props = defineProps<{
  formName: FormType | null
}>()

const forms = [
  {
    name: 'MerchForm',
    component: defineAsyncComponent(() => import('../MerchForm/MerchForm.vue')),
  },
  {
    name: 'EventForm',
    component: defineAsyncComponent(() => import('../EventForm/EventForm.vue')),
  },

  {
    name: 'NewsForm',
    component: defineAsyncComponent(() => import('../NewsForm/NewsForm.vue')),
  },
]

let Form: Component

const setForm = (): Component =>
  (forms.find((form) => form.name === props.formName)?.component as Component) ?? null

onBeforeMount(() => {
  Form = setForm()
})
</script>

<style scoped lang="css"></style>
