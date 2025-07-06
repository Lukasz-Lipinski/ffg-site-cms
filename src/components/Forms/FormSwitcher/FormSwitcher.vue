<template>
  <Component :is="Form" :title="title" />
</template>

<script setup lang="ts">
import { type Component, defineAsyncComponent, onBeforeMount, ref } from 'vue'
import type { FormType } from '@/components/Forms/FormSwitcher/abstracts'

const props = defineProps<{
  formName: FormType | null
}>()

const title = ref<string>()

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
