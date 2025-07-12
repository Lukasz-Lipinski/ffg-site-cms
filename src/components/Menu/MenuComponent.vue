<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LinkType } from '@/components/Menu/abtracts.ts'
import { useUserStore } from '@/stores/user.ts'

const links: LinkType[] = [
  {
    href: '/home',
    label: 'dashboard',
  },
  {
    label: 'Add event',
    href: '/new/event',
  },
  {
    label: 'Add merch',
    href: '/new/merch',
  },
  {
    label: 'Add news',
    href: '/new/news',
  },
]

const isActive = ref(false)
const userStore = useUserStore()
const router = useRouter()

function onLogout() {
  userStore.clearUserCred()
  router.push({
    name: 'registration',
  })
}
</script>

<template>
  <VContainer fluid @mouseenter="isActive = true" class="position-absolute">
    <VAppBar :model-value="isActive" @mouseleave="isActive = false" location="top">
      <template #default>
        <VBtn type="link" v-for="(link, index) of links" :key="index" :to="link.href">
          <span class="text-capitalize">{{ link.label }}</span>
        </VBtn>
      </template>
      <template #append>
        <VBtn type="button" color="#ff4c4c" @click="onLogout()" variant="text" text="Logout" />
      </template>
    </VAppBar>
  </VContainer>
</template>

<style scoped lang="css"></style>
