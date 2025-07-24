<template>
  <VContainer height="100%" class="d-flex align-center justify-center">
    <VContainer max-width="50%">
      <h2 class="text-center text-h4 pb-8 text-color">{{ title }}</h2>
      <LoginFormComponent
        @is-register-emitter.self="isRegister = $event"
        @is-success-verification="onRedirect"
        start-value="Login"
      />
    </VContainer>
  </VContainer>
</template>

<script lang="ts" setup>
import LoginFormComponent from '@/components/LoginForm/LoginFormComponent.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isRegister = ref()
const title = computed(() => (isRegister.value ? 'Sign up' : 'Login to your account'))

function onRedirect(success: boolean) {
  success &&
    router.push({
      name: 'dashboard-home',
    })
}
</script>

<style lang="css" scoped>
.text-color{
  color:  #CCCCCC !important
}</style>
