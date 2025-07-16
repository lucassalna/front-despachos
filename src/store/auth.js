import { reactive } from 'vue'

const state = reactive({
  token: localStorage.getItem('token') || ''
})

export const useAuthStore = () => ({
  token: state.token,
  setToken(newToken) {
    state.token = newToken
    localStorage.setItem('token', newToken)
  },
  clearToken() {
    state.token = ''
    localStorage.removeItem('token')
  }
})
