import { defineStore } from 'pinia'
import { ref } from 'vue'

export type LoggedUser = {
  id: string
  email: string
}

export const useUserStore = defineStore('userStore', () => {
  const user = ref<LoggedUser>({
    email: 'test@test.com',
    id: 'ad',
    // email: '',
    // id: '',
  })

  function setUser(cred: LoggedUser) {
    user.value = cred
  }
  function clearUserCred() {
    user.value = {
      email: '',
      id: '',
    }
  }

  return {
    user,
    setUser,
    clearUserCred,
  }
})
