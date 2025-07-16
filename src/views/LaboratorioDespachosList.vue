<template>
  <div class="p-6">
    <div class="flex gap-4 mb-6">
      <button
        @click="goTo('/laboratorio')"
        class="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Laboratorio
      </button>
      <button
        @click="goTo('/proveedores')"
        class="px-4 py-2 bg-green-600 text-white rounded"
      >
        Proveedores
      </button>
    </div>

    <h1 class="text-2xl font-bold mb-4">Despachos de Laboratorio</h1>

    <ul v-if="despachos.length" class="space-y-4">
      <li
        v-for="d in despachos"
        :key="d.id"
        class="p-4 border rounded bg-white shadow"
      >
        <p><strong>Orden externa:</strong> {{ d.external_order_id }}</p>
        <p><strong>Departamento:</strong> {{ d.lab_department }}</p>
        <p><strong>Producto:</strong> {{ d.product_name }}</p>
        <p><strong>Cantidad:</strong> {{ d.quantity }}</p>
        <p><strong>Estado:</strong> {{ d.status }}</p>
        <p><strong>Confirmado:</strong> {{ d.destination_confirmed ? '✅' : '❌' }}</p>
        <p><strong>Creado:</strong> {{ formatDate(d.created_at) }}</p>
        <p><strong>Actualizado:</strong> {{ formatDate(d.updated_at) }}</p>
        <p v-if="d.error_message"><strong>Error:</strong> {{ d.error_message }}</p>
      </li>
    </ul>

    <p v-else>No hay datos disponibles.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/axios'

const despachos = ref([])

onMounted(async () => {
  try {
    const res = await api.get('laboratorio-despachos/list/')
    despachos.value = res.data.results
  } catch (err) {
    console.error('Error cargando datos', err)
  }
})

function formatDate(isoString) {
  return new Date(isoString).toLocaleString()
}

import { useRouter } from 'vue-router'
const router = useRouter()

function goTo(path) {
  if (router.currentRoute.value.path !== path) {
    router.push(path)
  }
}

</script>
