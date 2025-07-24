<template>
  <VForm v-model="isValid" @submit.prevent="onVerify">
    <VTextField label="Email" v-model.trim="emailInput" :rules="emailRules" />
    <VTextField label="Password" v-model.trim="passwordInput" :rules="passwordRules" />
    <div class="d-flex justify-center">
      <VBtnToggle v-model="isRegisterOption" mandatory>
        <VBtn color="#59DDF0" variant="tonal" :value="FormOptions.Login">Login</VBtn>
        <VBtn color="#59DDF0" variant="tonal" :value="FormOptions.Register">Register</VBtn>
      </VBtnToggle>
    </div>
    <div class="d-flex justify-center">
      <VBtn
        type="submit"
        :disabled="!isValid || isLoading"
        :loading="isLoading"
        variant="tonal"
        :color="isValid ? 'secondary' : ''"
      >
        <template #loader> loading... </template>
        Submit
      </VBtn>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import { VForm, VTextField, VBtnToggle, VBtn } from 'vuetify/components'
import { ref, watch } from 'vue'
import { SnackbarColorType, useSnackbarStore } from '@/stores/snackbar.ts'
import { useUserStore } from '@/stores/user.ts'
import { CreateNewAccount, SignInUser } from '@/auth/auth.service.ts'
import { FormOptions } from '@/components/LoginForm/types.ts'

const snackbarStore = useSnackbarStore()
const userStore = useUserStore()

const { startValue } = defineProps<{
  startValue: keyof typeof FormOptions
}>()

const emailRules = [
  (value: string) => {
    return !!value || 'Email is required'
  },
  (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || 'Invalid email address'
  },
]
const passwordRules = [
  (value: string) => {
    return !!value || 'Password is required'
  },
]
const emailInput = ref<string>('')
const passwordInput = ref<string>('')

const emits = defineEmits<{
  (e: 'isRegisterEmitter', value: boolean): void
  (e: 'isSuccessVerification', value: boolean): void
}>()

const isRegisterOption = ref<keyof typeof FormOptions>(FormOptions[startValue])
const isValid = ref<boolean>(false)
const isLoading = ref<boolean>(false)

async function onVerify() {
  let isVerified = false
  isLoading.value = true

  try {
    const cred =
      isRegisterOption.value === FormOptions.Register
        ? await CreateNewAccount(emailInput.value, passwordInput.value)
        : await SignInUser(emailInput.value, passwordInput.value)

    if (cred) {
      userStore.setUser({
        email: cred.user.email ?? emailInput.value,
        id: cred.user.uid,
      })
    }

    isVerified = true
  } catch (e: any) {
    snackbarStore.show({
      color: SnackbarColorType.error,
      text: (e as Error).message ?? e,
    })
  } finally {
    isLoading.value = false
    emits('isSuccessVerification', isVerified)
  }
}

watch(
  () => isRegisterOption.value,
  (value) => {
    emits('isRegisterEmitter', value === FormOptions.Register)
  },
)
</script>

<style lang="css"></style>
