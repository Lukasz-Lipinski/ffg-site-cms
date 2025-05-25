import { defineStore } from 'pinia';
import { ref } from 'vue'

export type SnackbarType  = {
  timeout?: number;
  color: SnackbarColorType;
  text: string;
  isShown: boolean;
}

export enum SnackbarColorType {
  info = '#2196F3',
  warning = '#FFC107',
  error = '#FF5252',
  success = '#4CAF50'
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbar = ref<SnackbarType>({
    timeout: 0,
    color: SnackbarColorType.info,
    text: "",
    isShown: false
  })

  function show(snackbarDetails: Omit<SnackbarType, "isShown">) {
    snackbar.value.text = snackbarDetails.text
    snackbar.value.color = snackbarDetails.color
    snackbar.value.timeout = snackbarDetails.timeout ?? 2000
    snackbar.value.isShown = true
  }

  function hide() {
    snackbar.value.text = ""
    snackbar.value.color = SnackbarColorType.info
    snackbar.value.timeout = 0
    snackbar.value.isShown = false
  }

  return { snackbar, show, hide }
});
