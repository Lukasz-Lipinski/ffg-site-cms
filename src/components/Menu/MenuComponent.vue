<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { LinkType } from '@/components/Menu/abtracts.ts'
import { useUserStore } from '@/stores/user.ts'

const links: LinkType[] = [
  {
    href: '/home',
    label: 'dashboard',
    icon: 'mdi-home',
  },
  {
    label: 'Add event',
    href: '/new/event',
    icon: 'mdi-calendar-edit',
  },
  {
    label: 'Add merch',
    href: '/new/merch',
    icon: 'mdi-shopping-outline',
  },
  {
    label: 'Add news',
    href: '/new/news',
    icon: 'mdi-newspaper-variant-outline',
  },
]

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
  <div class="d-flex justify-space-between mb-5">
    <div class="d-flex ga-3">
      <VBtn
        v-for="(link, index) of links"
        :key="index"
        :to="link.href"
        :prepend-icon="link.icon"
        type="link"
        exact
        color="#3daef7"
        base-color="transparent"
        active-color="#59DDF0"
        variant="tonal"
        rounded
      >
        <span class="text-capitalize">{{ link.label }}</span>
      </VBtn>
    </div>
    <VBtn
      type="button"
      color="#F59E0B"
      @click="onLogout()"
      variant="text"
      text="Logout"
      prepend-icon="mdi-logout"
    />
  </div>
</template>

<style scoped lang="css"></style>
