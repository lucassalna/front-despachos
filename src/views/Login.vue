<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-80">
      <h1 class="text-xl mb-4 font-bold">Iniciar Sesión</h1>

      <input
        v-model="username"
        type="text"
        placeholder="Usuario"
        class="w-full mb-3 p-2 border"
      />

      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Contraseña"
          class="w-full mb-3 p-2 border pr-10"
        />
        <button
          type="button"
          class="absolute right-2 top-2 text-xl"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '🚫' : '👁️' }}
        </button>
      </div>

      <button class="w-full bg-blue-600 text-white p-2">Ingresar</button>

      <p v-if="error" class="text-red-500 mt-2">Credenciales inválidas</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../utils/axios'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref(false)

const auth = useAuthStore()
const router = useRouter()

const login = async () => {
  try {
    const res = await api.post('auth/login/', {
      username: username.value,
      password: password.value
    })
    auth.setToken(res.data.access)
    error.value = false
    router.push('/laboratorio')
  } catch {
    error.value = true
  }
}
</script>
